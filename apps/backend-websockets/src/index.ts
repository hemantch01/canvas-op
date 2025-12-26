import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
import { prisma } from "@repo/prisma/types";

const wss = new WebSocketServer({ port: 8080 });

function verifyUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") return null;
    return decoded.userId ?? null;
  } catch {
    return null;
  }
}

interface User {
  userId: string;
  rooms: string[];
  ws: WebSocket;
}

const users: User[] = [];

wss.on("connection", (ws, request) => {
  const token = new URLSearchParams(request.url?.split("?")[1]).get("token") ?? "";
  const userId = verifyUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  const user: User = { userId, rooms: [], ws };
  users.push(user);

  ws.on("message", async (raw) => {
    const data = JSON.parse(raw.toString());

    if (data.type === "join_room") {
      user.rooms.push(data.roomId);
      return;
    }

    if (data.type === "leave_room") {
      user.rooms = user.rooms.filter(r => r !== data.roomId);
      return;
    }

    if (data.type === "chat") {
      const roomId = Number(data.roomId);
      const shape = data.shape;

      if (!shape || Number.isNaN(roomId)) return;

      // ✅ Prisma ALWAYS receives a string
      await prisma.chat.create({
        data: {
          roomId,
          userId,
          message: JSON.stringify(shape)
        }
      });

      // Broadcast to room
      users.forEach(u => {
        if (u.rooms.includes(data.roomId)) {
          u.ws.send(JSON.stringify({
            type: "chat",
            roomId: data.roomId,
            shape
          }));
        }
      });
    }
  });
});
