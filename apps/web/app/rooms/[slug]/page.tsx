import axios from "axios";
import ChatRoom from "../../components/ChatRoom";
const BACKEND_URL = "something";
async function getRoomId(
    slug:string
){
    const res = await axios.get(`${BACKEND_URL}/rooms/${slug}`);
    console.log(res.data);
    return res.data.roomId;
}

export default async function(params:{slug:string}){
    const slug = (await params).slug;
    const roomId = await getRoomId(slug);
    return <ChatRoom roomId={roomId}></ChatRoom>
}