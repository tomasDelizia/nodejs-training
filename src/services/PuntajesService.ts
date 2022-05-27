import {IPuntajesService} from "./interfaces/IPuntajesService";
import {Puntajes} from "../entities/Puntajes";
import {injectable} from "inversify";
import {getManager} from "typeorm";

@injectable()
export class PuntajesService implements IPuntajesService {
    constructor() {}

    public async getPuntajePorIds(idAlumno: number, idProfesor: number, idTema: number): Promise<Puntajes> {
        try {
            const puntajesRepository = await getManager().getRepository(Puntajes);
            return await puntajesRepository.findOne({
                where: {
                    idAlumno: idAlumno,
                    idProfesor: idProfesor,
                    idTema: idTema
                },
                relations: [ "tema", "alumno", "profesor" ]
            });
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async registrarPuntaje(body: any): Promise<any> {
        try {
            let puntaje: Puntajes = new Puntajes();
            puntaje.idAlumno = body.alumno;
            puntaje.idProfesor = body.profesor;
            puntaje.idTema = body.tema;
            puntaje.interes = body.interes;
            puntaje.complejidad = body.complejidad;
            puntaje.entendimiento = body.entendimiento;
            puntaje.observaciones = body.observaciones;
            puntaje.valoracion = body.valoracion;

            await getManager().transaction(async (transactionalEntityManager) => {
                await transactionalEntityManager.save(puntaje);
            });
            return true;

        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public async modificarPuntaje(idAlumno: number, idProfesor: number, idTema: number, body: any): Promise<any> {
        try {
            await getManager().transaction(async (transactionalEntityManager)=>{
                await transactionalEntityManager.createQueryBuilder()
                    .update(Puntajes)
                    .set({
                        interes: body.interes,
                        complejidad: body.complejidad,
                        entendimiento: body.entendimiento,
                        valoracion: body.valoracion,
                        observaciones: body.observaciones
                    })
                    .where(`id_alumno = ${idAlumno}`)
                    .andWhere(`id_profesor = ${idProfesor}`)
                    .andWhere(`id_tema = ${idTema}`)
                    .execute();
            });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public async eliminarPuntaje(idPuntaje: number) {
        try {
            await getManager().transaction(async (transactionalEntityManager) => {
                await transactionalEntityManager.createQueryBuilder()
                    .delete()
                    .from(Puntajes)
                    .where(`id_puntaje = ${idPuntaje}`)
                    .execute();
            });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public async getPuntajesDeAlumno(cuil: string): Promise<Puntajes[]> {
        try {
            return await getManager()
                .createQueryBuilder(Puntajes, "p")
                .innerJoinAndSelect("p.alumno", "a")
                .innerJoinAndSelect("a.persona", "pe_al")
                .innerJoinAndSelect("p.profesor", "prof")
                .innerJoinAndSelect("prof.persona", "pe_prof")
                .innerJoinAndSelect("p.tema", "t")
                .select([
                    'p.idPuntaje idPuntaje',
                    'p.id_alumno idAlumno',
                    'pe_al.cuil cuil_alumno',
                    "concat(pe_al.nombre, ' ', pe_al.apellido) alumno",
                    'pe_al.nombre nombre_alumno',
                    'pe_al.apellido apellido_alumno',
                    'p.id_profesor idProfesor',
                    'pe_prof.cuil cuil_profesor',
                    "concat(pe_prof.nombre, ' ', pe_prof.apellido) profesor",
                    'pe_prof.nombre nombre_profesor',
                    'pe_prof.apellido apellido_profesor',
                    'p.idTema idTema',
                    't.nombre tema',
                    'p.interes interes',
                    'p.complejidad complejidad',
                    'p.entendimiento entendimiento',
                    'p.valoracion valoracion',
                    'p.observaciones observaciones'
                ])
                .where(`pe_al.cuil = ${cuil}`)
                .orderBy('p.idPuntaje')
                .getRawMany();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async getPuntajes(): Promise<Puntajes[]> {
        try {
            return await getManager()
                .createQueryBuilder(Puntajes, "p")
                .innerJoinAndSelect("p.alumno", "a")
                .innerJoinAndSelect("a.persona", "pe_al")
                .innerJoinAndSelect("p.profesor", "prof")
                .innerJoinAndSelect("prof.persona", "pe_prof")
                .innerJoinAndSelect("p.tema", "t")
                .select([
                    'p.idPuntaje idPuntaje',
                    'p.id_alumno idAlumno',
                    'pe_al.cuil cuil_alumno',
                    "concat(pe_al.nombre, ' ', pe_al.apellido) alumno",
                    'pe_al.nombre nombre_alumno',
                    'pe_al.apellido apellido_alumno',
                    'p.id_profesor idProfesor',
                    'pe_prof.cuil cuil_profesor',
                    "concat(pe_prof.nombre, ' ', pe_prof.apellido) profesor",
                    'pe_prof.nombre nombre_profesor',
                    'pe_prof.apellido apellido_profesor',
                    'p.idTema idTema',
                    't.nombre tema',
                    'p.interes interes',
                    'p.complejidad complejidad',
                    'p.entendimiento entendimiento',
                    'p.valoracion valoracion',
                    'p.observaciones observaciones'
                ])
                .orderBy('p.idPuntaje')
                .getRawMany();
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}