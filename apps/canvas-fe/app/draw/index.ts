import axios from "axios";

type Shape =
  | { type: "rect"; x: number; y: number; w: number; h: number }
  | { type: "circle"; x: number; y: number; radius: number };

  type Chat = {
  id: number;
  roomId: number;
  message: string;
  userId: string;
};

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const currentShapes: Shape[] = await getExistingShapes(roomId);
  drawShapes(ctx, canvas, currentShapes);

  let startX = 0;
  let startY = 0;
  let drawing = false;

  socket.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.type === "chat") {
      currentShapes.push(msg.shape);
      drawShapes(ctx, canvas, currentShapes);
    }
  };

  canvas.addEventListener("mousedown", (e) => {
    const r = canvas.getBoundingClientRect();
    drawing = true;
    startX = e.clientX - r.left;
    startY = e.clientY - r.top;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const r = canvas.getBoundingClientRect();
    const w = e.clientX - r.left - startX;
    const h = e.clientY - r.top - startY;
    drawShapes(ctx, canvas, currentShapes);
    ctx.strokeRect(startX, startY, w, h);
  });

  canvas.addEventListener("mouseup", (e) => {
    drawing = false;
    const r = canvas.getBoundingClientRect();
    const shape: Shape = {
      type: "rect",
      x: startX,
      y: startY,
      w: e.clientX - r.left - startX,
      h: e.clientY - r.top - startY
    };

    currentShapes.push(shape);
    drawShapes(ctx, canvas, currentShapes);

    socket.send(JSON.stringify({
      type: "chat",
      roomId,
      shape
    }));
    console.log(JSON.stringify({
      type: "chat",
      roomId,
      shape
    }))
  });
}

function drawShapes(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  shapes: Shape[]
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,20,20)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "white";

  shapes.forEach(s => {
    if (s.type === "rect") {
      ctx.strokeRect(s.x, s.y, s.w, s.h);
    }
  });
}

export async function getExistingShapes(roomId: string): Promise<Shape[]> {
  const res = await axios.get(`http://localhost:3001/v1/chats/${roomId}`);
  console.log(res.data);
  const fetchedChats = res.data.chats.map((x:Chat)=> JSON.parse(x.message));
  return fetchedChats;
}
