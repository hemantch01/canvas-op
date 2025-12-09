import { NextFunction,Request,Response } from "express";
import {JWT_SECRET} from "@repo/common-backend/config";
import jwt from "jsonwebtoken";
export const isVerifiedUser = (req:Request,res:Response,next:NextFunction)=>{

    const jwtToken  = req.headers.token as unknown as string;
    // verify token
  
        const isVerifiedUser  = jwt.verify(jwtToken,JWT_SECRET);
        
        if(!isVerifiedUser){
            res.json({
                msg:"invalid token failed to verify token"
            })
        }
        else{
            if(typeof(isVerifiedUser)==="string"){
                res.json({
                msg:"token parsed as string, so no valid token"
            })
            }
            else{
                req.userId = isVerifiedUser.userId;
                next()
            }
        }
   
}