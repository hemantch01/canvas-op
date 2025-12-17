import axios from "axios";
import ChatRoomClient from "./ChatRoomClient";
//  TODO: fix this and add the env 
const BACKEND_URL = "something";
export default async function ChatRoom({roomId}:{
    roomId:string
}){
  const chats = (await axios.get(`${BACKEND_URL}/chats/${roomId}`)).data;

  return <ChatRoomClient id={roomId} chats={chats}></ChatRoomClient>

}