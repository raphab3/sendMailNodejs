import ensureAuthenticated from "@modules/users/infra/http/middleware/ensureAuthenticated";
import { Router } from "express";
import CadastradosController from "../controllers/cadastradosController";

const cadastradosRouter = Router()
const cadastradosController = new CadastradosController()

// cadastradosRouter.use(ensureAuthenticated)
// find all

//Carregar CSV
cadastradosRouter.get('/csv', cadastradosController.csv)
cadastradosRouter.get('/certificado', cadastradosController.certificado)


cadastradosRouter.get('/', cadastradosController.index)

// find by id
cadastradosRouter.get('/:id', cadastradosController.show)

// new people
cadastradosRouter.post('/', cadastradosController.create)

export default cadastradosRouter
