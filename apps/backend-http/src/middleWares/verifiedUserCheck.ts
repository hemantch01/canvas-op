import { NextFunction,Request,Response } from "express";
import {JWT_SECRET} from "@repo/common-backend/config"
export const verifiedUser = (req:Request,res:Response,next:NextFunction)=>{

    const jwtToken = req.headers.token||"";
    if(jwtToken==""){
        res.json({
            msg:"you are not verified user"
        })
    }
    // verify token
    const secret = JWT_SECRET;
    if(verified){
        next();
    }
    else{
        res.json({
            msg:"you are not verified user"
        })
    }
}