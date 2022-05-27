import {Request, Response} from "express";
import {PersonaModel} from "../models/PersonaModel";

export class EjemploService {
    constructor() {
    }

    public async ejemploAction(request: Request, response: Response) {
        /*    return "Esto es un ejemplo";*/

        return response.status(200).send('Esto es un ejemplo.');
    }

    public async ejemploActionConParametros(request: Request, response: Response) {
        //const result = `Hola, mi nombre es ${request.params.nombre} ${request.params.apellido}`;
        //return response.status(200).send(result);
        return response.status(201).json(`Hola, mi nombre es ${request.params.nombre} ${request.params.apellido}`);
    }

    public async ejemploActionConQParametros(request: Request, response: Response) {
        return response.status(201).json(`Hola ${request.query.nombre} ${request.query.apellido}`);
    }

    public async ejemploActionPost(request: Request, response: Response) {
        let persona: PersonaModel = request.body;
        return response.status(201).json(`Hola, soy ${persona.nombre} ${persona.apellido} y tengo ${persona.edad} años.`);
    }
}