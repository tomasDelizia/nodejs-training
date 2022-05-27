import {IAlumnosService} from "./interfaces/IAlumnosService";
import {Alumnos} from "../entities/Alumnos";
import {injectable} from "inversify";
import {getManager} from "typeorm";
import {Personas} from "../entities/Personas";
import {Reparticiones} from "../entities/Reparticiones";

@injectable()
export class AlumnosService implements IAlumnosService {
    constructor() {}

    public async getAlumnos(): Promise<Alumnos[]> {
        try {
            const alumnosRepository = await getManager().getRepository(Alumnos);
            return await alumnosRepository.find({ relations: [ "reparticion", "persona" ] });
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async getAlumnosQB(): Promise<Alumnos[]> {
        try {
            return await getManager()
                .createQueryBuilder(Alumnos, 'a')
                .innerJoinAndSelect('a.persona', 'p')
                .leftJoinAndSelect('a.reparticion', 'r')
                .select([
                    'a.idAlumno idAlumno',
                    'p.nombre nombre',
                    'p.apellido apellido',
                    'p.cuil cuil',
                    'p.edad edad',
                    'r.nombre reparticion',
                ])
                .orderBy('idAlumno')
                .getRawMany();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public async getAlumnoPorCuil(nroCuil: string): Promise<Alumnos> {
        try {
            const alumnosRepository = await getManager().getRepository(Alumnos);
            return await alumnosRepository.findOne({
                where: {
                    persona: { cuil: nroCuil }
                },
                relations: [ "reparticion", "persona" ]
            });
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async getAlumnoPorId(idAlumno: string): Promise<Alumnos> {
        try {
            const alumnosRepository = await getManager().getRepository(Alumnos);
            return await alumnosRepository.findOne({
                where: {
                    idAlumno: idAlumno
                },
                relations: [ "reparticion", "persona" ]
            });
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async getAlumnoPorCuilQB(nroCuil: string): Promise<Alumnos> {
        try {
            return await getManager()
                .createQueryBuilder(Alumnos, "a")
                .addSelect("a.idAlumno", "idAlumno")
                .addSelect("a.idReparticion", "idReparticion")
                .addSelect("p.cuil", "cuil")
                .addSelect("p.nombre", "nombre")
                .addSelect("p.apellido", "apellido")
                .addSelect("p.edad", "edad")
                .innerJoin(Personas, "p", "a.idPersona = p.idPersona")
                .where(`p.cuil = ${nroCuil}`)
                .getOne();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async crearAlumno(body: any) {
        try {
            let alumno: Alumnos = new Alumnos();
            let persona: Personas = new Personas();

            persona.nombre = body.nombre;
            persona.apellido = body.apellido;
            persona.edad = body.edad;
            persona.cuil = body.cuil;

            const reparticionesRepository = await getManager().getRepository(Reparticiones);
            const reparticion: Reparticiones = await reparticionesRepository.findOne({
                nombre: `${body.reparticion}`
            });

            alumno.persona = persona;
            alumno.reparticion = reparticion;

            await getManager().transaction(async (transactionalEntityManager) => {
                await transactionalEntityManager.save(persona);
                await transactionalEntityManager.save(alumno);
            });
            return true;

        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public async eliminarAlumno(cuil: string) {
        try {
            const alumno: Alumnos = await this.getAlumnoPorCuil(cuil);

            await getManager().transaction(async (transactionalEntityManager) => {
                // Primero se elimina el alumno.
                await transactionalEntityManager.createQueryBuilder()
                    .delete()
                    .from(Alumnos)
                    .where(`id_persona = ${alumno.idPersona}`)
                    .execute();
                // Luego se elimina la persona.
                await transactionalEntityManager.createQueryBuilder()
                    .delete()
                    .from(Personas)
                    .where(`id_persona = ${alumno.idPersona}`)
                    .execute();
            });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public async modificarAlumno(cuil: string, body: any) {
        try {
            const alumno: Alumnos = await this.getAlumnoPorCuil(cuil);

            const reparticionesRepository = await getManager().getRepository(Reparticiones);
            const reparticion: Reparticiones = await reparticionesRepository.findOne({
                nombre: `${body.reparticion}`
            });

            await getManager().transaction(async (transactionalEntityManager)=>{
                await transactionalEntityManager.createQueryBuilder()
                    .update(Personas)
                    .set({
                        nombre: body.nombre,
                        apellido: body.apellido,
                        edad: body.edad
                    })
                    .where(`id_persona = ${alumno.idPersona}`)
                    .execute();
                await transactionalEntityManager.createQueryBuilder()
                    .update(Alumnos)
                    .set({reparticion: reparticion})
                    .where(`id_persona = ${alumno.idPersona}`)
                    .execute();
            });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

}