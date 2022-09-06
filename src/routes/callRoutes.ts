import express from "express";
import { CallController } from "../controllers/callController";


export const calls = express.Router();

calls
    .get("/calls", CallController.listCalls)
    .get("/calls/:id", CallController.listCallsById)
    .post("/calls", CallController.registerCallDriver)
    .put("/calls/:id", CallController.updateLatLngCall)
    .delete("/calls/:id", CallController.deleteCall)