const schemaPost = {
    edad: {
        isLength: {
            errorMessage: "La edad es obligatoria.",
            options: {
                min: 1
            },
        },
        isInt: true,
        errorMessage: "Debe ser un valor entero.",
    },
    nombre: {
        isLength: {
            errorMessage: "El nombre es obligatorio.",
            options: {
                min: 1
            },
        },
        isString: true,
        errorMessage: "Debe ser una cadena.",
    },
    apellido: {
        isLength: {
            errorMessage: "El apellido es obligatorio.",
            options: {
                min: 1
            },
        },
        isString: true, errorMessage: "Debe ser una cadena.",
    },
};

const schemaEjemplo = {};
const schemaEjemploQParams = {};
const schemaEjemploParams = {};
const schemaTemas = {};
const schemaReparticiones = {};
const schemaPorSP = {};
const schemaAlumnos = {};
const schemaPuntajes = {};
const schemaProfesores = {};

export const Schema = {
    schemaEjemplo,
    schemaEjemploQParams,
    schemaEjemploParams,
    schemaTemas,
    schemaReparticiones,
    schemaPorSP,
    schemaPost,
    schemaAlumnos,
    schemaPuntajes,
    schemaProfesores
};