import {injectable} from "inversify";
import {getManager} from "typeorm";
import {IProfesoresService} from "./interfaces/IProfesoresService";
import {Profesores} from "../entities/Profesores";

@injectable()
export class ProfesoresService implements IProfesoresService {
    constructor() {}

    public async getProfesores(): Promise<Profesores[]> {
        try {
            const profesoresRepository = await getManager().getRepository(Profesores);
            return await profesoresRepository.find({ relations: [ "cargo", "persona" ] });
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async getProfesoresQB(): Promise<Profesores[]> {
        try {
            return await getManager()
                .createQueryBuilder(Profesores, 'pr')
                .innerJoinAndSelect('pr.persona', 'p')
                .leftJoinAndSelect('pr.cargo', 'c')
                .select([
                    'pr.idProfesor idProfesor',
                    'p.nombre nombre',
                    'p.apellido apellido',
                    'p.cuil cuil',
                    'c.nombre cargo',
                ])
                .getRawMany();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public async getProfesorPorCuil(nroCuil: string): Promise<Profesores> {
        try {
            const profesoresRepository = await getManager().getRepository(Profesores);
            return await profesoresRepository.findOne({
                where: {
                    persona: { cuil: nroCuil }
                },
                relations: [ "cargo", "persona" ]
            });
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async getProfesorPorId(idProfesor: string): Promise<Profesores> {
        try {
            const profesoresRepository = await getManager().getRepository(Profesores);
            return await profesoresRepository.findOne({
                where: {
                    idProfesor: idProfesor
                },
                relations: [ "cargo", "persona" ]
            });
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}