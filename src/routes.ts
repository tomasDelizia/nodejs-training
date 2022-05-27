import {EjemploController} from "./controllers/EjemploController";
import {TemasController} from "./controllers/TemasController";
import {AlumnosController} from "./controllers/AlumnosController";
import {PuntajesController} from "./controllers/PuntajesController";
import {ReparticionesController} from "./controllers/ReparticionesController";
import {ProfesoresController} from "./controllers/ProfesoresController";
import {Schema} from "./middlewares/ValidationSchema";

export const AppRoutes = [
    {
        path: '/ejemplo',
        method: 'get',
        action: EjemploController.ejemploAction,
        schema: Schema.schemaEjemplo
    },
    {
        path: '/ejemploParams/:nombre/:apellido',
        method: 'get',
        action: EjemploController.ejemploActionConParametros,
        schema: Schema.schemaEjemploParams
    },
    {
        path: '/ejemploQParams',
        method: 'get',
        action: EjemploController.ejemploActionConQParametros,
        schema: Schema.schemaEjemploQParams
    },
    {
        path: '/ejemploPost',
        method: 'post',
        action: EjemploController.ejemploActionPost,
        schema: Schema.schemaPost
    },
    {
        path: '/obtenerReparticiones',
        method: 'get',
        action: EjemploController.obtenerReparticiones,
        schema: Schema.schemaReparticiones
    },
    {
        path: '/obtenerReparticionesPorNombre',
        method: 'get',
        action: EjemploController.obtenerReparticionesPorNombre,
        schema: Schema.schemaReparticiones
    },
    {
        path: '/obtenerTemas',
        method: 'get',
        action: EjemploController.obtenerTemas,
        schema: Schema.schemaTemas
    },
    {
        path: '/obtenerTemasPorSP/:id',
        method: 'get',
        action: EjemploController.obtenerTemasPorSP,
        schema: Schema.schemaTemas
    },
    {
        path: '/getTemas',
        method: 'get',
        action: TemasController.getTemas,
        schema: Schema.schemaTemas
    },
    {
        path: '/getTemaPorId/:id',
        method: 'get',
        action: TemasController.getTemaPorId,
        schema: Schema.schemaTemas
    },
    {
        path: '/getAlumnos',
        method: 'get',
        action: AlumnosController.getAlumnos,
        schema: Schema.schemaAlumnos
    },
    {
        path: '/getAlumnoPorCuil/:cuil',
        method: 'get',
        action: AlumnosController.getAlumnoPorCuil,
        schema: Schema.schemaAlumnos
    },
    {
        path: '/crearAlumno',
        method: 'post',
        action: AlumnosController.crearAlumno,
        schema: Schema.schemaAlumnos
    },
    {
        path: '/eliminarAlumno/:cuil',
        method: 'delete',
        action: AlumnosController.eliminarAlumno,
        schema: Schema.schemaAlumnos
    },
    {
        path: '/modificarAlumno/:cuil',
        method: 'put',
        action: AlumnosController.modificarAlumno,
        schema: Schema.schemaAlumnos
    },
    {
        path: '/registrarPuntaje',
        method: 'post',
        action: PuntajesController.registrarPuntaje,
        schema: Schema.schemaPuntajes
    },
    {
        path: '/modificarPuntaje',
        method: 'put',
        action: PuntajesController.modificarPuntaje,
        schema: Schema.schemaPuntajes
    },
    {
        path: '/eliminarPuntaje/:idPuntaje',
        method: 'delete',
        action: PuntajesController.eliminarPuntaje,
        schema: Schema.schemaPuntajes
    },
    {
        path: '/getPuntajesDeAlumno/:cuil',
        method: 'get',
        action: PuntajesController.getPuntajesDeAlumno,
        schema: Schema.schemaPuntajes
    },
    {
        path: '/getReparticiones',
        method: 'get',
        action: ReparticionesController.getReparticiones,
        schema: Schema.schemaReparticiones
    },
    {
        path: '/getPuntajes',
        method: 'get',
        action: PuntajesController.getPuntajes,
        schema: Schema.schemaPuntajes
    },
    {
        path: '/getProfesores',
        method: 'get',
        action: ProfesoresController.getProfesores,
        schema: Schema.schemaProfesores
    },
];
