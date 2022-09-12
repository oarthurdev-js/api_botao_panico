import express from "express";
import { driverController } from './../controllers/driverController';
import { checkToken } from "./../controllers/driverController";

export const drivers = express.Router();

drivers
    .get("/drivers", checkToken,driverController.listDriver)
    .get("/drivers/:id",checkToken,driverController.listDriverById)
    .post("/driver", driverController.registerDriver)
    .post("/auth/driver", driverController.authenticateDriver)
    .put("/drivers/:id", driverController.updateLatLngDriver)
    .delete("/drivers/:id", driverController.deleteDriver)