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

export function initDraw(canvas: HTMLCanvasElement) {

    const currentShapes: Shape[] = [];


    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "rgba(0,20,20)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let startX = 0;
    let startY = 0;
    let isStarted = false;
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

        currentShapes.push({
            type: "rect",
            x: startX,
            y: startY,
            w: width,
            h: height
        });

        drawShapes(ctx, canvas, currentShapes);
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