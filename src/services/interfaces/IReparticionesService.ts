import {Reparticiones} from "../../entities/Reparticiones";

export interface IReparticionesService {
    getReparticiones(): Promise<Reparticiones[]>
}