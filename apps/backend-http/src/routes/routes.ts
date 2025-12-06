import express,{Router,Request,Response} from "express";
import { verifiedUser } from "../middleWares/verifiedUserCheck";

export const routeHandler: Router = express.Router();

routeHandler.post("/signup",signupHandler);
routeHandler.post("/signin",signinHandler);
routeHandler.post("/createRoom",verifiedUser,createRoomHandler);


function signupHandler(req:Request,res:Response){
res.json({
    msg: "this is signup route"
})
}



function signinHandler(req:Request,res:Response){
res.json({
    msg: "this is signin route"
})
}



function createRoomHandler(req:Request,res:Response){
res.json({
    msg: "this is createRoom route"
})
}
