"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _typeorm = require("typeorm");

var _Users = _interopRequireDefault(require("../infra/typeorm/entities/Users"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    id
  }) {
    const userRepository = (0, _typeorm.getRepository)(_Users.default);
    const chekUserExists = await this.usersRepository.find({
      where: {
        id
      }
    });

    if (!chekUserExists) {
      throw new _AppError.default("User not fund");
    }

    userRepository.delete({
      id
    });
  }

}) || _class) || _class) || _class) || _class);
exports.default = DeleteUserService;