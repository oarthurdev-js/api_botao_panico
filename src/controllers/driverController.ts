import { Request, Response } from 'express';
import {driver} from '../models/Driver';

export class driverController {
    static listDriver = (req: Request, res: Response) => {
        driver.find((err, driver) => {
            res.status(200).json(driver);
        })
    }

    static registerDriver = (req: Request, res: Response) => {
        let drivers = new driver(req.body);

        drivers.save((error: any) => {
            if(error){
                res.status(500).send({message: `aconteceu um erro ao salvar a sua chamada.\n${error.message}`});
            } else {
                res.status(201).send(drivers.toJSON());
            }
        });
    }

    static updateLatLngDriver= (req: Request, res: Response) => {
        const id = req.params.id;
        const latitude = req.params.latitude;
        const longitude = req.params.longitude;

        driver.findByIdAndUpdate(id, {$set: req.body}, (error: any) => {
            if(!error){
                res.status(200).send({message: `a atualização da latitude e longitude foram atualizadas\nlatitude:${latitude}\nlongitude:${longitude}`});
            } else {
                res.status(500).send({message: `ocorreu um erro na atualização de sua longitude e latitude\n${error}`});
            }
        })

    }

    static listDriverById = (req:Request, res: Response) => {
        const id = req.params.id;

        driver.findById(id, (error: any, driver: any) => {
            if(error){
                res.status(400).send({message: `${error.message}\n id do livro não encontrado`});
            } else {
                res.status(200).send(driver);
            }
        });
    }

    static deleteDriver= (req: Request, res: Response) => {
        const id  = req.params.id;

        driver.findByIdAndDelete(id, (error:any) => {
            if(!error) {
                res.status(200).send({message: `a ligação foi deletada com sucesso!`});
            } else {
                res.status(500).send({message: error.message});
            }
        })
    }
}