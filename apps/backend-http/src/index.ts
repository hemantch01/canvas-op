import express  from "express";
import cors from "cors";
import { routeHandler } from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/v1",routeHandler);
app.listen(3001,()=>{
    console.log("backend Listening on port 3001")
})