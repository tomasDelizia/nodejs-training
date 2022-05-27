import {Request, Response} from "express";
import container from "../services/inversify.config";
import Types from "../services/types/types";
import {TemasService} from "../services/TemasService";
import {Temas} from "../entities/Temas";
import HttpStatusCode from "../enums/HttpStatusCode";

const _temasService = container.get<TemasService>(Types.Temas);

async function getTemas(request: Request, response: Response): Promise<Response> {
    try {
        let temas: Temas[] = await _temasService.getTemas();
        if (temas.length > 0)
            return response.status(HttpStatusCode.OK).json(temas);
        else if (temas.length == 0)
            return response.sendStatus(HttpStatusCode.NOT_FOUND);
    } catch (e) {
        console.log(e);
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}

async function getTemaPorId(request: Request, response: Response): Promise<Response> {
    try {
        let tema = await _temasService.getTemaPorId(+request.params.id);
        console.log(tema);
        if (tema === undefined)
            return response.sendStatus(HttpStatusCode.NOT_FOUND);
        return response.status(HttpStatusCode.OK).json(tema);
    } catch (e) {
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}

export const TemasController = {
    getTemas,
    getTemaPorId
}