"use client";

import { useEffect, useRef, useState } from "react";

export default function Room() {
  const cRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    setSize({
      w: window.innerWidth,
      h: window.innerHeight,
    });
  }, []);

  useEffect(()=>{
        const canvas = cRef.current;
        if(!canvas)return ;
        const ctx = canvas.getContext("2d");
        if(!ctx)return ;
        

        let startX = 0;
        let startY =  0;
        let width = 0;
        let height = 0;
        let isStarted = false;
        canvas.addEventListener("mousedown",(e)=>{
            isStarted =true;
            startX = e.clientX;
            startY = e.clientY;
        })
        canvas.addEventListener("mousemove",(e)=>{
            if(isStarted){
                width = e.clientX-startX;
                height = e.clientY-startY;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.strokeRect(startX,startY,width,height);
            }
        })
        canvas.addEventListener("mouseup",(e)=>{
            isStarted  = false;
            width = e.clientX-startX;
            height = e.clientY-startY;
            // ctx.clearRect(0,0,canvas.width,canvas.height)
            ctx.strokeRect(startX,startY,width,height);
        })
        
  },[size.h,size.w])

  return (
    <canvas
      ref={cRef}
      width={size.w}
      height={size.h}
      style={{ background: "white"}}
    />
  );
}
