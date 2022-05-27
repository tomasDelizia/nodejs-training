import container from "../services/inversify.config";
import Types from "../services/types/types";
import {Request, Response} from "express";
import {AlumnosService} from "../services/AlumnosService";
import {Alumnos} from "../entities/Alumnos";
import HttpStatusCode from "../enums/HttpStatusCode";

const _alumnosService = container.get<AlumnosService>(Types.Alumnos);

async function getAlumnos(request: Request, response: Response): Promise<Response> {
    try {
        let alumnos: Alumnos[] = await _alumnosService.getAlumnosQB();
        if (alumnos.length > 0)
            return response.status(HttpStatusCode.OK).json(alumnos);
        else if (alumnos.length == 0)
            return response.sendStatus(HttpStatusCode.NOT_FOUND);
    } catch (e) {
        console.log(e);
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}

async function getAlumnoPorCuil(request: Request, response: Response): Promise<Response> {
    try {
        let alumno: Alumnos = await _alumnosService.getAlumnoPorCuil(request.params.cuil);
        if (alumno === undefined)
            return response.sendStatus(HttpStatusCode.NOT_FOUND);
        return response.status(HttpStatusCode.OK).json(alumno);
    } catch (e) {
        console.log(e);
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}

async function crearAlumno(request: Request, response: Response): Promise<Response> {
    try {
        return response.status(HttpStatusCode.OK).json(await _alumnosService.crearAlumno(request.body))
    } catch (e) {
        return response.sendStatus(HttpStatusCode.CONFLICT)
    }
}

async function eliminarAlumno(request: Request, response: Response): Promise<Response> {
    try {
        const eliminado: boolean = await _alumnosService.eliminarAlumno(request.params.cuil);
        if (!eliminado)
            return response.sendStatus(HttpStatusCode.CONFLICT);
        return response.status(HttpStatusCode.OK).json(eliminado);
    } catch (e) {
        console.log(e);
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}

async function modificarAlumno(request: Request, response: Response): Promise<Response> {
    try {
        const modificado: boolean = await _alumnosService.modificarAlumno(request.params.cuil, request.body);
        if (!modificado)
            return response.sendStatus(HttpStatusCode.CONFLICT);
        return response.status(HttpStatusCode.OK).json(modificado);
    } catch (e) {
        console.log(e);
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}

export const AlumnosController = {
    getAlumnos,
    getAlumnoPorCuil,
    crearAlumno,
    eliminarAlumno,
    modificarAlumno
}