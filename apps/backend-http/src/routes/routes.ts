import express,{Router,Request,Response} from "express";
import { isVerifiedUser } from "../middleWares/verifiedUserCheck.js";
import {prisma} from "@repo/prisma/types";
import { createRoomSchema, userSchema } from "@repo/types";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";
export const routeHandler: Router = express.Router();

routeHandler.post("/signup",signupHandler);
routeHandler.post("/signin",signinHandler);
routeHandler.post("/createRoom",isVerifiedUser,createRoomHandler);
routeHandler.get("/chats/:roomId",getChatsHandler);

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


    // add the  password dbcrypt library for password hashing
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
            userId: user.id,
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



async function createRoomHandler(req:Request,res:Response){
    const parsedUser = createRoomSchema.safeParse({
        name:req.body.roomName
    })
    if(!parsedUser.success){
        res.json({
            msg : "arguments are not valid input"
        })
    }
    const userId = req.userId;
    console.log(userId);
        if(typeof(userId)!=="string"){
            return res.json({
                msg: "garbage inputs"
            })
        }
    try{
       const createdRoom =  await prisma.room.create({
            data:{
                slug:req.body.roomName,
                adminId:userId,
            }
        })
        res.json({
            roomId : createdRoom.id
        })
    }catch (e){
        res.json({
            error : e
        })
    }
}

async function getChatsHandler(req:Request,res:Response){
    // we have the room id 

    const roomid = Number(req.params.roomId);
    const chats = await prisma.chat.findMany({
        where:{
            id:roomid
        },
        orderBy:{
            id:"desc"
        },
        take:50
    })
    res.json({
        chats
    })
}


