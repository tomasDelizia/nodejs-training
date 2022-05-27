import { Request, Response } from 'express';
import {EjemploService} from "../services/EjemploService";
import {EjemploServiceBis} from "../services/EjemploServiceBis";
import container from "../services/inversify.config";
import Types from "../services/types/types";

// Instanciamos el servicio una sola vez.
let _ejemploServiceBis = container.get<EjemploServiceBis>(Types.Ejemplo);

export async function ejemploAction(request: Request, response: Response): Promise<Response> {
    /*
    let service: EjemploService = new EjemploService();
    return service.ejemploAction(request, response);
     */
    let service: EjemploServiceBis = new EjemploServiceBis();
    return response.status(200).json(await service.ejemplo());
}

export async function ejemploActionConParametros(request: Request, response: Response): Promise<Response> {
    /*let service: EjemploService = new EjemploService();
    return service.ejemploActionConParametros(request, response);

    let service: EjemploServiceBis = new EjemploServiceBis();
    return response.status(201).json(await service.ejemploConParametros(request.params.nombre, request.params.apellido));
     */
    return response.status(201).json(await _ejemploServiceBis.ejemploConParametros(request.params.nombre, request.params.apellido));
}


export async function ejemploActionConQParametros(request: Request, response: Response): Promise<Response> {
    let service: EjemploService = new EjemploService();
    return service.ejemploActionConQParametros(request, response);
}

export async function ejemploActionPost(request: Request, response: Response): Promise<Response> {
    /*let service: EjemploService = new EjemploService();
    return service.ejemploActionPost(request, response);*/
    let service: EjemploServiceBis = new EjemploServiceBis();
    // Hay que esperar a que el servicio resuelva la lógica antes de devolver el resultado -> usamos la palabra await
    return response.status(200).json(await service.ejemploPost(request.body));
}

export async function obtenerTemas(request: Request, response: Response): Promise<Response> {
    return response.status(200).json(await _ejemploServiceBis.obtenerTemas())
}

export async function obtenerReparticiones(request: Request, response: Response): Promise<Response> {
    return response.status(200).json(await _ejemploServiceBis.obtenerReparticiones())
}

export async function obtenerReparticionesPorNombre(request: Request, response: Response): Promise<Response> {
    return response.status(200).json(await _ejemploServiceBis.obtenerReparticionesPorNombre(request.params.nombre))
}

export async function obtenerTemasPorSP(request: Request, response: Response): Promise<Response> {
    return response.status(200).json(await _ejemploServiceBis.obtenerTemasPorSP(+request.params.id))
}

export const EjemploController = {
    ejemploAction,
    ejemploActionConParametros,
    ejemploActionConQParametros,
    ejemploActionPost,
    obtenerTemas,
    obtenerReparticiones,
    obtenerReparticionesPorNombre,
    obtenerTemasPorSP
}