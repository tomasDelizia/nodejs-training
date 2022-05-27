import {Profesores} from "../../entities/Profesores";

export interface IProfesoresService {
    getProfesores(): Promise<Profesores[]>
    getProfesoresQB(): Promise<Profesores[]>
    getProfesorPorCuil(cuil: string): Promise<Profesores>
    getProfesorPorId(idProfesor: string): Promise<Profesores>
}