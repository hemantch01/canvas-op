import axios from "axios";
import { Chat, Shape } from ".";

export async function getExistingShapes(roomId: string): Promise<Shape[]> {
  const res = await axios.get(`http://localhost:3001/v1/chats/${roomId}`);
  const fetchedChats = res.data.chats.map((x:Chat)=> JSON.parse(x.message));
  return fetchedChats;
}