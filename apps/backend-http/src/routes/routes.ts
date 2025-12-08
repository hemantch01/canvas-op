import express,{Router,Request,Response} from "express";
//import { verifiedUser } from "../middleWares/verifiedUserCheck";
import {prisma} from "@repo/db";
import "dotenv/config";
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
        console.log("RAW ENV STRING:", JSON.stringify(process.env.DATABASE_URL));
        console.log("DATABASE_URL:", process.env.DATABASE_URL);
        await prisma.user.create({
            data:{
                name,
                password,
                email
            }
        })
         return res.status(201).json({
      message: "User created successfully",
      name
    });
    } catch(e){
        console.log("prismaError",e);
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
