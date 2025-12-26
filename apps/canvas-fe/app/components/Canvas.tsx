"use client"

import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";

export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {
    console.log("i am inside the canvas");
    const cRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });

    useEffect(() => {
        setSize({
            w: window.innerWidth,
            h: window.innerHeight,
        });
    }, []);

    useEffect(() => {
        const canvas = cRef.current;
        if (!canvas) return;
        initDraw(canvas, roomId,socket);
    }, [size.h, size.w])

    

    return (
        <canvas
            ref={cRef}
            width={size.w}
            height={size.h}
            style={{ background: "white" }}
        />
    );
}