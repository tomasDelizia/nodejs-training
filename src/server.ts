import "reflect-metadata";
import Express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import { AppRoutes } from './routes';
import {connectDB} from "./database";
import cors = require('cors');

// Validaciones de esquema.
const { checkSchema, validationResult } = require("express-validator");

// Definición de la zona horaria.
process.env.TZ = 'America/Argentina/Cordoba'

const app = Express();
app.use(cors(
    {
        credentials: true,
        origin: process.env.URL_CLIENT_WEB,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        exposedHeaders: [ 'Authorization' ]
    }));
app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200,
    }));

// Para recibir las peticiones en cualquier verbo HTTP.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


AppRoutes.forEach((route) => {
   app.use(
       route.path,
       checkSchema(route.schema),
       (request: Request, response: Response, next: Function) => {
           const errors = validationResult(request);
           if (!errors.isEmpty())
               return response.json(validationResult(request).array());
           route
               .action(request, response)
               .then(() => next)
               .catch((err) => next(err));
       }
   )
});

//Iniciamos el servidor express
const startServer = async () => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server running on http://127.0.0.1:${process.env.PORT}`);
    });
};

(async () => {
    await connectDB();
    await startServer();
})();