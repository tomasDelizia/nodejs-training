import container from "../services/inversify.config";
import Types from "../services/types/types";
import {PuntajesService} from "../services/PuntajesService";
import {Request, Response} from "express";
import HttpStatusCode from "../enums/HttpStatusCode";
import {Puntajes} from "../entities/Puntajes";

const _puntajesService = container.get<PuntajesService>(Types.Puntajes);

async function registrarPuntaje(request: Request, response: Response): Promise<Response> {
    try {
        return response.status(HttpStatusCode.OK).json(await _puntajesService.registrarPuntaje(request.body))
    } catch (e) {
        return response.sendStatus(HttpStatusCode.CONFLICT)
    }
}

async function modificarPuntaje(request: Request, response: Response): Promise<Response> {
    try {
        const modificado: boolean = await _puntajesService.modificarPuntaje(
            +request.query.idAlumno,
            +request.query.idProfesor,
            +request.query.idTema,
            request.body);
        if (!modificado)
            return response.sendStatus(HttpStatusCode.CONFLICT);
        return response.status(HttpStatusCode.OK).json(modificado);
    } catch (e) {
        console.log(e);
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}

async function eliminarPuntaje(request: Request, response: Response): Promise<Response> {
    try {
        const eliminado: boolean = await _puntajesService.eliminarPuntaje(+request.params.idPuntaje);
        if (!eliminado)
            return response.sendStatus(HttpStatusCode.CONFLICT);
        return response.status(HttpStatusCode.OK).json(eliminado);
    } catch (e) {
        console.log(e);
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}

async function getPuntajesDeAlumno(request: Request, response: Response): Promise<Response>  {
    try {
        let puntajes: Puntajes[] = await _puntajesService.getPuntajesDeAlumno(request.params.cuil);
        if (puntajes.length > 0)
            return response.status(HttpStatusCode.OK).json(puntajes);
        else if (puntajes.length == 0)
            return response.sendStatus(HttpStatusCode.NOT_FOUND);
    } catch (e) {
        console.log(e);
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}

async function getPuntajes(request: Request, response: Response): Promise<Response>  {
    try {
        let puntajes: Puntajes[] = await _puntajesService.getPuntajes();
        if (puntajes.length > 0)
            return response.status(HttpStatusCode.OK).json(puntajes);
        else if (puntajes.length == 0)
            return response.sendStatus(HttpStatusCode.NOT_FOUND);
    } catch (e) {
        console.log(e);
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}

export const PuntajesController = {
    registrarPuntaje,
    modificarPuntaje,
    eliminarPuntaje,
    getPuntajesDeAlumno,
    getPuntajes
}