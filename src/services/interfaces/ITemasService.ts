import {Temas} from "../../entities/Temas";

export interface ITemasService {
    getTemas(): Promise<Temas[]>
    getTemaPorId(id: number): Promise<Temas>
}