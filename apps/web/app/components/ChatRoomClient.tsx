import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomClient({id, chats}:{
    id:string,
    chats:{chat:string}[];
}){
    const {loading, socket} = useSocket();
    const [currChats, setcurrChats] = useState(chats);
    const [currMessage,setcurrMessage] = useState("");
    useEffect(()=>{
        if(!socket|| loading){
            return ;
        }

        socket.send(JSON.stringify({
            type:"join_room",
            roomId :id
        }));

        socket.onmessage = (e)=>{
            const parsedData = JSON.parse(e.data);
            if(parsedData.type === "chat"){
             setcurrChats(c=>[...c,{chat: parsedData.message}]);
            }
        }
    },[socket,loading,id])


    return <div>
        {currChats.map((c)=>{
            return <div>
                c.chat
            </div>
        })}

        <input type="text" value = {currMessage} onChange={e =>{
            setcurrMessage(e.target.value);
        }}/>
        <button onClick={()=>{
            socket?.send(JSON.stringify({
                type:"chat",
                roomId:id,
                message:currMessage
            }))
        }}>
            send Message
        </button>
    </div>
}