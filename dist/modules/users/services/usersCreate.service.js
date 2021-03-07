"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    username,
    email,
    password
  }) {
    console.log("USER SERVICE => ", {
      username,
      email,
      password
    });
    const chekUserExistsUsername = await this.usersRepository.findByUsername(username);
    const chekUserExistsEmail = await this.usersRepository.findByEmail2(email);
    console.log("CHECK USER chekUserExistsUsername => ", chekUserExistsUsername);
    console.log("CHECK USER chekUserExistsEmail => ", chekUserExistsEmail);

    if (chekUserExistsEmail || chekUserExistsUsername) {
      throw new _AppError.default("Email address or username already used.");
    }

    const user = await this.usersRepository.create({
      username,
      email,
      password: await (0, _bcryptjs.hash)(password, 8)
    });
    console.log("user ok => ", user);
    return user;
  }

}) || _class) || _class) || _class) || _class);
exports.default = CreateUserService;