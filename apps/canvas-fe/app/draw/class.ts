import { Shape } from ".";
import { getExistingShapes } from "./getShapes";

enum shapeType {
    rectangle,
    circle,
    arrow
}
export class Draw {
    private canvas: HTMLCanvasElement;
    private roomId: string;
    private socket: WebSocket;
    private ctx: CanvasRenderingContext2D;
    private currentShapes: Shape[];
    private startX = 0;
    private startY = 0;
    private drawing: boolean;
    private currentSelectedShape:shapeType;
    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.roomId = roomId;
        this.drawing = false;
        this.socket = socket;
        this.ctx = canvas.getContext("2d")!;
        this.currentShapes = [];
        this.init();
        this.initHandlers();
        this.mouseHandlers();
        this.currentSelectedShape= shapeType.circle;
    }
    setSelected(shape:shapeType){
        this.currentSelectedShape = shape;
    }
    initHandlers() {
        this.socket.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.type === "chat") {
                this.currentShapes.push(msg.shape);
                this.drawShapes();
            }
        };

    }
    mouseHandlers(){
        this.canvas.addEventListener("mousedown", (e) => {
            const r = this.canvas.getBoundingClientRect();
            this.drawing = true;
            this.startX = e.clientX - r.left;
            this.startY = e.clientY - r.top;
          });
        
          this.canvas.addEventListener("mousemove", (e) => {
            if (!this.drawing) return;
            const r = this.canvas.getBoundingClientRect();
            const w = e.clientX - r.left - this.startX;
            const h = e.clientY - r.top - this.startY;
            this.drawShapes();
            this.ctx.strokeRect(this.startX, this.startY, w, h);
          });
        
          this.canvas.addEventListener("mouseup", (e) => {
            this.drawing = false;
            const r = this.canvas.getBoundingClientRect();
            const shape: Shape = {
              type: "rect",
              x: this.startX,
              y: this.startY,
              w: e.clientX - r.left - this.startX,
              h: e.clientY - r.top - this.startY
            };
        
            this.currentShapes.push(shape);
            this.drawShapes();
        
            this.socket.send(JSON.stringify({
              type: "chat",
              roomId:this.roomId,
              shape
            }));
            console.log(JSON.stringify({
              type: "chat",
              roomId:this.roomId,
              shape
            }))
          });
    }
    async init() {
        await getExistingShapes(this.roomId);
        this.drawShapes();
    }
    drawShapes() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,20,20)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = "white";

        this.currentShapes.forEach(s => {
            if (s.type === "rect") {
                this.ctx.strokeRect(s.x, s.y, s.w, s.h);
            }
        });


    }

}