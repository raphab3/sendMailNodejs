import { Router } from 'express'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'

import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "@config/swagger.json"
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import cadastradosRouter from '@modules/cadastrados/infra/http/routes/cadastrados.router'

const routes = Router()

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter);
routes.use('/participantes', cadastradosRouter)

export default routes
