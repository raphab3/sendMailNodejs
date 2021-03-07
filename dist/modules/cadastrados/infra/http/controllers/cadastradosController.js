"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _neatCsv = _interopRequireDefault(require("neat-csv"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _cadastradoCreate = _interopRequireDefault(require("../../../services/cadastradoCreate.service"));

var _cadastradoFind = _interopRequireDefault(require("../../../services/cadastradoFind.service"));

var _cadastradosFindById = _interopRequireDefault(require("../../../services/cadastradosFindById.service"));

var _cadastradosGenerateCertificate = _interopRequireDefault(require("../../../services/cadastradosGenerateCertificate.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CadastradosController {
  async csv(request, response) {
    const preRegisteredService = _tsyringe.container.resolve(_cadastradoCreate.default);

    const tmpFolderCsv = _path.default.resolve(__dirname, '..', '..', '..', '..', '..', '..', '..', 'tmp/csv/participantes.csv');

    _fs.default.readFile(tmpFolderCsv, async (erro, file) => {
      console.log(file);
      let data = await (0, _neatCsv.default)(file);
      data.forEach(async linha => {
        let participante = {
          full_name: "",
          email: ""
        };
        participante.full_name = linha.Nome.toLocaleUpperCase();
        participante.email = linha.Email.toLocaleLowerCase();
        await preRegisteredService.execute({
          full_name: participante.full_name,
          email: participante.email
        });
      });
    });

    return response.status(200).json({
      data: "Import success!"
    });
  }

  async certificado(request, response) {
    const cadastradosService = _tsyringe.container.resolve(_cadastradosGenerateCertificate.default);

    const email = request.query.email;
    const full_name = request.query.full_name;
    const participante = await cadastradosService.execute({
      full_name,
      email
    });
    return response.status(200).json({
      msg: "Certificado Gerado",
      data: participante
    });
  }

  async index(request, response) {
    const cadastradosService = _tsyringe.container.resolve(_cadastradoFind.default); // Paginação skip => numero da página, take => quantos por página


    let {
      skip,
      take
    } = request.query;
    skip = parseInt(skip);
    take = parseInt(take);
    const cadastrados = await cadastradosService.execute({
      skip,
      take
    });
    const total = cadastrados.length;
    return response.status(200).json({
      data: cadastrados,
      page: skip,
      limit: take,
      total: total
    });
  }

  async show(request, response) {
    const {
      id
    } = request.params;

    const cadastradosService = _tsyringe.container.resolve(_cadastradosFindById.default);

    const people = await cadastradosService.execute({
      id
    }).catch(() => {
      console.log("Error: People not found!");
    });
    return response.status(200).json({
      data: people
    });
  }

  async create(request, response) {
    const {
      full_name,
      email
    } = request.body;
    console.log({
      full_name,
      email
    });

    const createCadastrado = _tsyringe.container.resolve(_cadastradoCreate.default);

    const cadastrado = await createCadastrado.execute({
      full_name,
      email
    });
    return response.status(200).json({
      data: cadastrado
    });
  }

}

exports.default = CadastradosController;