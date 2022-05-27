import {injectable} from "inversify";
import {getManager} from "typeorm";
import {IReparticionesService} from "./interfaces/IReparticionesService";
import {Reparticiones} from "../entities/Reparticiones";

@injectable()
export class ReparticionesService implements IReparticionesService {
    constructor() {}

    public async getReparticiones(): Promise<Reparticiones[]> {
        try {
            const reparticionesRepository = await getManager().getRepository(Reparticiones);
            return await reparticionesRepository.find();
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}