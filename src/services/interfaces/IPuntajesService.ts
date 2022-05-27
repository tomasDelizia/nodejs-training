import {Puntajes} from "../../entities/Puntajes";

export interface IPuntajesService {
    getPuntajePorIds(idAlumno: number, idProfesor: number, idTema: number): Promise<Puntajes>
    registrarPuntaje(body: any): Promise<any>
    modificarPuntaje(idAlumno: number, idProfesor: number, idTema: number, body: any): Promise<any>
    eliminarPuntaje(idPuntaje: number): Promise<any>
    getPuntajesDeAlumno(cuil: string): Promise<Puntajes[]>
    getPuntajes(): Promise<Puntajes[]>
}