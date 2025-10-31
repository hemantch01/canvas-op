import express,{Router,Request,Response} from "express";

export const routeHandler: Router = express.Router();

routeHandler.post("/signup",signupHandler);
routeHandler.post("/signin",signinHandler);
routeHandler.post("/createRoom",createRoomHandler);


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



function createRoomHandler(req:Request,,res:Response){
res.json({
    msg: "this is createRoom route"
})
}
