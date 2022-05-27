import {ITemasService} from "./interfaces/ITemasService";
import {Temas} from "../entities/Temas";
import {injectable} from "inversify";
import {getManager} from "typeorm";

@injectable()
export class TemasService implements ITemasService {
    constructor() {}

    public async getTemas(): Promise<Temas[]> {
        try {
            const temasRepository = await getManager().getRepository(Temas);
            return await temasRepository.find();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public async getTemaPorId(id: number): Promise<Temas> {
        try {
            const temasRepository = await getManager().getRepository(Temas);
            return await temasRepository.findOne({idTema: id});
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}