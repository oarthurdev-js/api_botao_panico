import express, { Request, Response } from "express";
import{ calls }from "./callRoutes";
import { drivers } from "./driverRoutes";

export const routes = (app: any) => {
    app.route('/').get((req: Request, res: Response) => {
        res.status(200).send({message: "teste funcionando perfeitamente"})
    })


    app.use(
        express.json(),
        calls,
        drivers
    )
}