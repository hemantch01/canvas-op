import { NextFunction,Request,Response } from "express";

export const verifiedUser = (req:Request,res:Response,next:NextFunction)=>{

    const jwtToken = req.headers.token||"";
    if(jwtToken==""){
        res.json({
            msg:"you are not verified user"
        })
    }
    // verify token

    if(verified){
        next();
    }
    else{
        res.json({
            msg:"you are not verified user"
        })
    }
}