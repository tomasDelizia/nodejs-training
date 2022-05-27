import {PersonaModel} from "../models/PersonaModel";
import {injectable} from "inversify";
import {IEjemploService} from "./interfaces/IEjemploService";
import {getManager} from "typeorm";
import {Temas} from "../entities/Temas";
import {Reparticiones} from "../entities/Reparticiones";
import {TemasModel} from "../models/TemasModel";
import {plainToClass} from "class-transformer";

// Decorador que permite hacer a las clases inyectables.
@injectable()
export class EjemploServiceBis implements IEjemploService {
    constructor() {
    }

    public async ejemplo() {
        return "Esto es un ejemplo";
    }

    public async ejemploConParametros(nombre: string, apellido: string): Promise<string> {
        return `Hola ${nombre} ${apellido}`;
    }

    public async ejemploConQParametros(nombre: string, apellido: string) {
        return `Hola ${nombre} ${apellido}`;
    }

    public async ejemploPost(persona: PersonaModel) {
        return `Hola, soy ${persona.nombre} ${persona.apellido} y tengo ${persona.edad} años.`;
    }

    public async obtenerTemas(): Promise<any> {
        try {
            // Traemos la conexión a la BD y creamos la consulta.
            const t: any = await getManager()
                .createQueryBuilder(Temas, "t")
                .addSelect("t.idTema", "id")
                .addSelect("t.nombre", "nombre")
                .addSelect("t.descripcion", "descripcion")
                .addSelect("t.duracion", "duracion")
                .orderBy("t.idTema", "DESC")
                .getRawMany();

            return t;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }

    public async obtenerReparticiones(): Promise<Reparticiones[]> {
        try {
            const reparticionesRepository = await getManager().getRepository(Reparticiones);
            const p = await reparticionesRepository.find();
            return p;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async obtenerReparticionesPorNombre(nombre: string = "Municipalidad"): Promise<Reparticiones[]>  {
        try {
            const reparticionesRepository = await getManager().getRepository(Reparticiones);
            const p = await reparticionesRepository.find({nombre: nombre});
            return p;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    // Usamos la librería de class-transformer con TemasModel
    async obtenerTemasPorSP(idTema: number): Promise<TemasModel>  {
        try {
            let resultado: TemasModel;
            await getManager()
                .query(`CALL OBT_TEMAS(${idTema})`).then(x => {
                    let result: TemasModel;
                    result = plainToClass(TemasModel, x[0], {
                        excludeExtraneousValues: true
                    });
                    resultado = result;
                }).catch(e => {
                    console.log("No se encontraron registros.");
                });
            return resultado;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}