"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICadastradosRepository = _interopRequireDefault(require("../repositories/ICadastradosRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CadastradosCreateService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CadastradosRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICadastradosRepository.default === "undefined" ? Object : _ICadastradosRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CadastradosCreateService {
  constructor(cadastradosRepository) {
    this.cadastradosRepository = cadastradosRepository;
  }

  async execute({
    full_name,
    email
  }) {
    console.log("cadastrado - ", {
      full_name,
      email
    });
    const cadastrado = await this.cadastradosRepository.create({
      full_name,
      email
    });
    return cadastrado;
  }

}) || _class) || _class) || _class) || _class);
exports.default = CadastradosCreateService;