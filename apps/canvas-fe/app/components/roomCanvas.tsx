"use client"
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}:{roomId:string}){
        console.log ("i am inside the room canvas here i have to connect to the websocket");
        // TODO: MAKE IT A HOOK TO CONNECT TO THE WS SERVER
        
        const [socket , setSocket] = useState<WebSocket|null>(null);
        
        
        useEffect(()=>{
            const ws = new WebSocket("ws://localhost:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY2NGE5Mi1hYjk4LTRhNzktODQzZi03MzY4NGQzMWNmYzIiLCJlbWFpbCI6ImhlbWFudGNoYXVkaGFyeUBnbWFpbC5jb20iLCJuYW1lIjoiaGVtYW50IGt1bWFyIiwiaWF0IjoxNzY2NzYxNTEzfQ.05NYDKgl_j02BG3_hZtT3gaeYEKcsrVyi6iZXoXXZGY");
            console.log("i reached here and socket connection setup")
            ws.onopen = (e)=>{
                setSocket(ws);
                ws.send(JSON.stringify({
                    type:"join_room",
                    roomId
                }))
            }
        },[]);

     if(!socket){
        return <div>
            connecting to server...
        </div>
     }
     else {
        return <Canvas roomId={roomId} socket={socket} />
     }

}