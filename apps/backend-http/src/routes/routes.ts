import express,{Router,Request,Response} from "express";
//import { verifiedUser } from "../middleWares/verifiedUserCheck";
 import {prisma} from "@repo/prisma/types";
import { userSchema } from "@repo/types";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
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



async function signinHandler(req:Request,res:Response){
    const {name ,email,password} = req.body;
    const parsedUserData = userSchema.safeParse({
        name,email,password
    });
    if(!parsedUserData.success){
        res.json({
            msg: "problem with parsing, probably req.body has not correct inputs"
        })
    }
    try {
        const user = await prisma.user.findFirst({
            where:{
                email: req.body.email,
                password:req.body.password
            }
        });
        if(user===null){
            return res.status(401).json({
                msg:"you are not signup user please signup"
            })
        }
        const token = jwt.sign({
            email:req.body.email,
            name:req.body.name
        },JWT_SECRET);
        res.json({
            msg: "you have sucessfully logged in",
            token
        })
    } catch(e){
        res.json({
            msg:"there is problem in interacting with db"
        })
    }
}



function createRoomHandler(req:Request,res:Response){
res.json({
    msg: "this is createRoom route"
})
}
