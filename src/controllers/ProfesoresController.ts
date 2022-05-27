import container from "../services/inversify.config";;
import Types from "../services/types/types";
import {Request, Response} from "express";
import HttpStatusCode from "../enums/HttpStatusCode";
import {ProfesoresService} from "../services/ProfesoresService";
import {Profesores} from "../entities/Profesores";

const _profesoresService = container.get<ProfesoresService>(Types.Profesores);

async function getProfesores(request: Request, response: Response): Promise<Response> {
    try {
        let profesores: Profesores[] = await _profesoresService.getProfesoresQB();
        if (profesores.length > 0)
            return response.status(HttpStatusCode.OK).json(profesores);
        else if (profesores.length == 0)
            return response.sendStatus(HttpStatusCode.NOT_FOUND);
    } catch (e) {
        console.log(e);
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}

export const ProfesoresController = {
    getProfesores,
}