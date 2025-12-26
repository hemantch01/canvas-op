import axios from "axios";

type Shape = {
    type: "rect",
    x: number,
    y: number,
    h: number,
    w: number
} | {
    type: "circle",
    x: number,
    y: number,
    radius: number
}

export async function initDraw(canvas: HTMLCanvasElement,roomId:string, socket: WebSocket) {

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const currentShapes: Shape[] = await getExistingShapes(roomId);
    drawShapes(ctx,canvas,currentShapes);
    ctx.fillStyle = "rgba(0,20,20)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let startX = 0;
    let startY = 0;
    let isStarted = false;

    socket.onmessage = (e)=>{
        const message  = JSON.parse(e.data);
        const parsedMsg = JSON.parse(message.message);
        if(message.type=="chat"){
            currentShapes.push(parsedMsg);
            drawShapes(ctx,canvas,currentShapes);
        }
    }
    canvas.addEventListener("mousedown", (e) => {
        isStarted = true;
        startX = e.clientX;
        startY = e.clientY;
    })
     canvas.addEventListener("mousemove", (e) => {
            if (!isStarted) return;

            const width = e.clientX - startX;
            const height = e.clientY - startY;

            // redraw everything
            drawShapes(ctx, canvas, currentShapes);

            // draw preview rectangle on top
            ctx.strokeStyle = "rgba(255,255,255)";
            ctx.strokeRect(startX, startY, width, height);
        });
    canvas.addEventListener("mouseup", (e) => {
        isStarted = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        const shape:Shape = {
            type: "rect",
            x: startX,
            y: startY,
            w: width,
            h: height
        }
        currentShapes.push(shape);
        drawShapes(ctx, canvas, currentShapes);

        socket.send(JSON.stringify(
            {
                type:"chat",
                message:JSON.stringify({
                    shape
                })
            }
        ))
    })
}


function drawShapes(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, currentShapes: Shape[]) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,20,20)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255,255,255)"

    currentShapes.map((shape) => {
        if (shape.type === "rect") ctx.strokeRect(shape.x, shape.y, shape.w, shape.h);
    })
}

export async function getExistingShapes(roomId:string){
    // axios call and get the chats 
        let res;
    try {
         res = await axios.get(`http://localhost/3001/chats/${roomId}`)
    }catch(e){
        console.log(`error while fetching existing chats   ${e}`);
        return "error while fetching existing chats"
    }
    const data = res.data; // its string here 

    const shapes = data.map((x:string)=>{
        return JSON.parse(x);
    })

    return shapes;
}  