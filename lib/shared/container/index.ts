import { container } from "tsyringe"

import '@modules/users/providers';
import './providers';

import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IUserTokensRepository from "@modules/users/repositories/IUserTokensRepository";

import UserTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";
import CadastradosRepository from "@modules/cadastrados/infra/typeorm/repositories/cadastradosRepository";
import ICadastradosRepository from "@modules/cadastrados/repositories/ICadastradosRepository";

// USER AND AUTHENTICATION
container.registerSingleton<IUserTokensRepository>("UserTokensRepository", UserTokensRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository)

// HUMAN RESOURCES
container.registerSingleton<ICadastradosRepository>("CadastradosRepository", CadastradosRepository) // Cadastrados
