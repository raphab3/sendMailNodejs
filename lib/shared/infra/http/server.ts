import 'reflect-metadata'
import 'dotenv/config';

import '@shared/infra/typeorm';
import "@shared/container"
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();
const PORT = 5555;

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// CORS
app.use((req, res, next) => {
  app.use(cors)
  if (res) {
    console.log("Passou pelo CORS")
  }
  next()
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(express.json());
app.use("/api/v1", cors(corsOptions), routes)

// Middlewares Global de Erros
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});


app.listen(`${PORT}`, () => {
  console.log(`SERVER ON TO PORT => ${PORT}`);
});