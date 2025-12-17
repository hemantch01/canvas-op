import {WebSocketServer,WebSocket} from "ws";
import {JWT_SECRET} from "@repo/common-backend/config";
import jwt from "jsonwebtoken";
import {prisma} from "@repo/prisma/types";
const wss = new WebSocketServer({port:8080});

// TODO: make it more expressive
function verifyUser(token :string):string|null{
    try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch(e) {
    return null;
  }
}

interface userT{
    userId:string,
    rooms:string[],
    wsObj:WebSocket
}

// TODO: make state management more verbose and efficient before that make the room centric code first
// maybe using state management library here
const userS:userT[] = [];

wss.on('connection',function connection(wsObj,request){
    const url = request.url;
    const queryParam = new URLSearchParams(url?.split('?')[1]);
    const token = queryParam.get('token')||"";
    const validId = verifyUser(token);
    if(validId === null){
        wsObj.send("the token verification was not completed, problem with token");
        wsObj.close();
        return ;
    }
    userS.push({
        userId:validId,
        rooms:[],
        wsObj
    })

    wsObj.on('message',async (msg)=>{
        const parsedMsg = JSON.parse(msg.toString());
        if(parsedMsg.type==="join_room"){
            const user = userS.find((x)=>x.wsObj===wsObj);
            if(!user){
                return ;
            }
            user.rooms.push(parsedMsg.roomId);
        }

        if(parsedMsg.type==="leave_room"){
            const user = userS.find((x)=>x.wsObj==wsObj);
            if(!user){
                return ;
            }
            user.rooms.filter((x)=> x===parsedMsg.roomId)
        }

        if(parsedMsg.type==="chat"){
            const msg = parsedMsg.msg;
            const roomId = parsedMsg.roomId;
            // also we have to store these chats in the db
            await prisma.chat.create({
                data:{
                    roomId,
                    message:msg,
                    userId:validId
                },
                
            },)
            userS.forEach(user=>{
                if(user.rooms.includes(roomId)){
                    user.wsObj.send(JSON.stringify({
                        type:"chat",
                        msg,
                        roomId
                    }))
                }
            })
        }
        
    })
})