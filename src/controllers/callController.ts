import { Request, Response } from 'express';
import {calls} from '../models/Call';

export class CallController {



    static listCalls = (req: Request, res: Response) => {
        calls.find()
        .populate('driver')
        .exec((err: any, calls: any) => {
            res.status(200).json(calls);
        })
    }

    static registerCallDriver = (req: Request, res: Response) => {
        let call = new calls(req.body);

        call.save((error: any) => {
            if(error){
                res.status(500).send({message: `aconteceu um erro ao salvar a sua chamada.\n${error.message}`});
            } else {
                res.status(201).send(call.toJSON());
            }
        });
    }

    static updateLatLngCall = (req: Request, res: Response) => {
        const id = req.params.id;
        const latitude = req.params.latitude;
        const longitude = req.params.longitude;

        calls.findByIdAndUpdate(id, {$set: req.body}, (error: any) => {
            if(!error){
                res.status(200).send({message: `a atualização da latitude e longitude foram atualizadas\nlatitude:${latitude}\nlongitude:${longitude}`});
            } else {
                res.status(500).send({message: `ocorreu um erro na atualização de sua longitude e latitude\n${error}`});
            }
        })

    }

    static listCallsById = (req:Request, res: Response) => {
        const id = req.params.id;

        calls.findById(id, (error: any, calls: any) => {
            if(error){
                res.status(400).send({message: `${error.message}\n id do livro não encontrado`});
            } else {
                res.status(200).send(calls);
            }
        });
    }

    static deleteCall = (req: Request, res: Response) => {
        const id  = req.params.id;

        calls.findByIdAndDelete(id, (error:any) => {
            if(!error) {
                res.status(200).send({message: `a ligação foi deletada com sucesso!`});
            } else {
                res.status(500).send({message: error.message});
            }
        })
    }
}