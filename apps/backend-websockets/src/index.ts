import {WebSocketServer} from "ws";
import {JWT_SECRET} from "@repo/common-backend/config";
import jwt from "jsonwebtoken";
const wss = new WebSocketServer({port:8080});

wss.on('connection',function connection(wsObj,request){
    const url = request.url;
    const queryParam = new URLSearchParams(url?.split('?')[1]);
    const token = queryParam.get('token');
    if(!token){
        wsObj.send("the token is not available in queries please send the token in the queries");
        wsObj.close();
        return ;
    }
    
    try{
        const playload = jwt.verify(token,JWT_SECRET);
    }
    catch(e){
        wsObj.send("token is not valid");
        return ;
    }
    
    wsObj.on('message',()=>{
        wsObj.send("hello");
    })
})