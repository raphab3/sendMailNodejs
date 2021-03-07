"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

require("./providers");

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _cadastradosRepository = _interopRequireDefault(require("../../modules/cadastrados/infra/typeorm/repositories/cadastradosRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// USER AND AUTHENTICATION
_tsyringe.container.registerSingleton("UserTokensRepository", _UserTokensRepository.default);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.default); // HUMAN RESOURCES


_tsyringe.container.registerSingleton("CadastradosRepository", _cadastradosRepository.default); // Cadastrados