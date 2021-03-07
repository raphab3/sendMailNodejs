"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cadastrados = require("./../entities/cadastrados.entity");

var _typeorm = require("typeorm");

class CadastradosRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_cadastrados.Cadastrados);
  }

  async findById(id) {
    const cadastrado = await this.ormRepository.findOne(id).catch(() => console.log("Person not found"));
    return cadastrado;
  }

  async count() {
    const total = this.ormRepository.count();
    return total;
  }

  async find({
    skip,
    take
  }) {
    console.log({
      skip,
      take
    });
    const Cadastrados = await this.ormRepository.find({
      skip,
      take,
      order: {
        id: 'DESC'
      }
    });
    return Cadastrados;
  }

  async create({
    full_name,
    email
  }) {
    const cadastrado = this.ormRepository.create({
      full_name,
      email
    });
    await this.ormRepository.save(cadastrado);
    return cadastrado;
  }

  async findByEmail(email) {
    const cadastrado = await this.ormRepository.findOne({
      email: email
    });
    return cadastrado;
  }

}

exports.default = CadastradosRepository;