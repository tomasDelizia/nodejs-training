import {Alumnos} from "../../entities/Alumnos";

export interface IAlumnosService {
    getAlumnos(): Promise<Alumnos[]>
    getAlumnosQB(): Promise<Alumnos[]>
    getAlumnoPorCuil(cuil: string): Promise<Alumnos>
    getAlumnoPorId(idAlumno: string): Promise<Alumnos>
    crearAlumno(body: any): Promise<any>
    eliminarAlumno(cuil: string): Promise<any>
    modificarAlumno(cuil: string, body: any): Promise<any>
}