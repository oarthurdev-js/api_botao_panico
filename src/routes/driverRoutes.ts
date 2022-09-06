import express from "express";
import { driverController } from './../controllers/driverController';


export const drivers = express.Router();

drivers
    .get("/drivers", driverController.listDriver)
    .get("/drivers/:id", driverController.listDriverById)
    .post("/drivers", driverController.registerDriver)
    .put("/drivers/:id", driverController.updateLatLngDriver)
    .delete("/drivers/:id", driverController.deleteDriver)