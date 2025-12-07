import { NextFunction,Request,Response } from "express";
import {JWT_SECRET} from "@repo/common-backend/config";
import jwt from "jsonwebtoken";
export const verifiedUser = (req:Request,res:Response,next:NextFunction)=>{

    const jwtToken  = req.headers.token as unknown as string;
    // verify token
    let verified = null;
    try{
         verified = jwt.verify(jwtToken,JWT_SECRET);
    } catch(e){
        res.json({
            "msg": "cannot verify the token, the token is wrong"
        })
    }
    if(verified){
        next();
    }
    else{
        res.json({
            msg:"sorry there is some problem this shoudn't be triggered"
        })
    }
}