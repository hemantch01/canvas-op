import express,{Router,Request,Response} from "express";
import { verifiedUser } from "../middleWares/verifiedUserCheck";
import {prisma} from "@repo/db";
import { userSchema } from "@repo/types";
export const routeHandler: Router = express.Router();

routeHandler.post("/signup",signupHandler);
routeHandler.post("/signin",signinHandler);
//routeHandler.post("/createRoom",verifiedUser,createRoomHandler);


async function signupHandler(req:Request,res:Response){
    const {name ,email,password} = req.body;
    const parsedUserData = userSchema.safeParse({
        name,email,password
    });
    if(!parsedUserData.success){
        res.json({
            err:"there is error in parsing the given inputs please send all the given inputs",
        })
    }

    // the db interaction code..

    //
    // add the  password dbcrypt
    //
    try{
        await prisma.user.create({
            data:{
                name,
                password,
                email
            }
        })
    } catch(e){
        res.json({
            "error":"there is error interacting in db",
            "type":e
        })
    }

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
