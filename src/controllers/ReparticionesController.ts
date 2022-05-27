import {Request, Response} from "express";
import container from "../services/inversify.config";
import Types from "../services/types/types";
import HttpStatusCode from "../enums/HttpStatusCode";
import {ReparticionesService} from "../services/ReparticionesService";
import {Reparticiones} from "../entities/Reparticiones";

const _reparticionesService = container.get<ReparticionesService>(Types.Reparticiones);

async function getReparticiones(request: Request, response: Response): Promise<Response> {
    try {
        let reparticiones: Reparticiones[] = await _reparticionesService.getReparticiones();
        if (reparticiones.length > 0)
            return response.status(HttpStatusCode.OK).json(reparticiones);
        else if (reparticiones.length == 0)
            return response.sendStatus(HttpStatusCode.NOT_FOUND);
    } catch (e) {
        console.log(e);
        return response.sendStatus(HttpStatusCode.CONFLICT);
    }
}
export const ReparticionesController = {
    getReparticiones
}