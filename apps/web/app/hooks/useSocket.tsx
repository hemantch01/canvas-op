import { useEffect, useState } from "react";
const ws_url = "";
export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();
  // TODO: make the socket connection singleton 
    useEffect(()=>{
    const ws = new WebSocket(`${ws_url}?token= given token`)
        ws.onopen= ()=>{
            setLoading(false);
            setSocket(ws);
        }
},[]);

return {
    socket,
    loading
}
}