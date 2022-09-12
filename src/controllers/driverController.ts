import { NextFunction, Request, Response } from 'express';
import {driver} from '../models/Driver';
import * as bcrypt from 'bcrypt';
import process from 'process';
import * as jwt from 'jsonwebtoken';

export class driverController {
    static listDriver = (req: Request, res: Response) => {
        driver.find((err, driver) => {
            res.status(200).json(driver);
        })
    }  
    
    static registerDriver = async (req: Request, res: Response) => {
           
        const {
            RATR,
            name_driver, 
            vehicle_color, 
            description_status_move, 
            license_plate_vehicle, 
            plate_state, 
            brand_vehicle, 
            model_vehicle, 
            cellphone_number
        } = req.body;

        const createCrypt = await bcrypt.genSalt(12);
        const cellphoneHash = await bcrypt.hash(cellphone_number, createCrypt);
        
        let drivers = new driver({
            RATR,
            name_driver,
            vehicle_color,
            description_status_move,
            license_plate_vehicle,
            plate_state,
            brand_vehicle,
            model_vehicle,
            cellphone_number : cellphoneHash
        });


        drivers.save((error: any) => {
            if(error){
                res.status(500).send({message: `aconteceu um erro ao salvar a sua chamada.\n${error.message}`});
            } else {
                res.status(201).send(drivers.toJSON());
            }
        });
    }

    static authenticateDriver = async (req: Request, res: Response) => {

        const {RATR, cellphone_number} = req.body;

        if(!RATR){
            return res.status(422).json({message: 'o RATR é obrigatório'});
        }
        if(!cellphone_number){
            return res.status(422).json({message: 'o numero de telefone é obrigatório'});
        }
        const driverExists = await driver.findOne({RATR: RATR});

        if(!driverExists){
            return res.status(404).json({message: 'motorista não existe'});
        }

        try {
            const secret = process.env.SECRET as string;
            const token = jwt.sign(
                {
                    RATR: {},
                },
                secret,
            )
            res.status(200).json({message: 'autenticação realizada com sucesso', token});

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'deu erro ai em', error})
        }

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
                res.status(400).send({message: `${error.message}\n id do motorista não encontrado`});
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


export function checkToken (req: Request, res: Response, next: NextFunction)  {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(" ")[1]

   if(!token){
       return res.status(401).json({message: 'acesso negado'})
   }

   
}