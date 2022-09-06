import { routes } from './routes/index';
import express from "express";
import {db} from "./config/dbConnect";



db.on("error", console.log.bind(console, "connection error"));
db.once("open", () => {
    console.log("connection with database successfully");
})

const app = express();

app.use(express.json());

routes(app);




export default app;