"use client"

import { useEffect, useRef, useState } from "react";
import { Draw } from "../draw/class";
import { Icon } from "./button";
import { ArrowRight, Circle, RectangleHorizontalIcon } from "lucide-react";

enum shapeType {
    rectangle,
    circle,
    arrow
}

export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {

    const cRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [draw,setDraw] = useState<Draw>();
    const [isSelected, setIsSelected] = useState<shapeType>(shapeType.circle);
    useEffect(() => {
        setSize({
            w: window.innerWidth,
            h: window.innerHeight,
        });
    }, []);
    
    useEffect(()=>{
        draw?.setSelected(isSelected);

    },[isSelected,draw]);

    useEffect(() => {
        const canvas = cRef.current;
        if (!canvas) return;
        const d = new Draw(canvas,roomId,socket);
        setDraw(d);
        return ()=>{
            // fill this
        }
    }, [size.h, size.w])

    

    return <div>
        <canvas
            ref={cRef}
            width={size.w}
            height={size.h}
            style={{ background: "white" }}
        />
        <div className="fixed top-5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
                <Icon
                    children={<ArrowRight />}
                    onClick={() => setIsSelected(shapeType.arrow)}
                    isSelected={isSelected === shapeType.arrow}
                />
                <Icon
                    children={<RectangleHorizontalIcon />}
                    onClick={() => setIsSelected(shapeType.rectangle)}
                    isSelected={isSelected === shapeType.rectangle}
                />
                <Icon
                    children={<Circle />}
                    onClick={() => setIsSelected(shapeType.circle)}
                    isSelected={isSelected === shapeType.circle}
                /></div>
    </div>;
}