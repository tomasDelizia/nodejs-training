import {Perfil} from "./Perfil";

export class Usuario {
    nombre: string;
    password: string;
    id: number; perfil:
    Perfil;

    constructor(id: number, perfil: Perfil, nombre: string, password: string) {
        this.id = id;
        this.perfil = perfil;
        this.nombre = nombre;
        this.password = password;
    }
}