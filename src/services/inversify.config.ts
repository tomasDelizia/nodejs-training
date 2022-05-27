import {Container} from "inversify";
import {IEjemploService} from "./interfaces/IEjemploService";
import Types from "./types/types";
import {EjemploServiceBis} from "./EjemploServiceBis";
import {ITemasService} from "./interfaces/ITemasService";
import {TemasService} from "./TemasService";
import {IAlumnosService} from "./interfaces/IAlumnosService";
import {AlumnosService} from "./AlumnosService";
import {IPuntajesService} from "./interfaces/IPuntajesService";
import {PuntajesService} from "./PuntajesService";
import {IProfesoresService} from "./interfaces/IProfesoresService";
import {ProfesoresService} from "./ProfesoresService";
import {IReparticionesService} from "./interfaces/IReparticionesService";
import {ReparticionesService} from "./ReparticionesService";

const container = new Container();

container.bind<IEjemploService>(Types.Ejemplo).to(EjemploServiceBis);
container.bind<ITemasService>(Types.Temas).to(TemasService);
container.bind<IAlumnosService>(Types.Alumnos).to(AlumnosService);
container.bind<IProfesoresService>(Types.Profesores).to(ProfesoresService);
container.bind<IPuntajesService>(Types.Puntajes).to(PuntajesService);
container.bind<IReparticionesService>(Types.Reparticiones).to(ReparticionesService);

export default container;