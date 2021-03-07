"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ICadastradosRepository = _interopRequireDefault(require("../repositories/ICadastradosRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CadastradosFindByIdService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CadastradosRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICadastradosRepository.default === "undefined" ? Object : _ICadastradosRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CadastradosFindByIdService {
  constructor(cadastradosRepository) {
    this.cadastradosRepository = cadastradosRepository;
  }

  async execute({
    id
  }) {
    const cadastrado = await this.cadastradosRepository.findById(id);

    if (!cadastrado) {
      throw new _AppError.default("User not found!", 404);
    }

    return cadastrado;
  }

}) || _class) || _class) || _class) || _class);
exports.default = CadastradosFindByIdService;