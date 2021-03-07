"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Users = _interopRequireDefault(require("../entities/Users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Users.default);
  }

  findByEmailAndUsername(username, email) {
    throw new Error('Method not implemented.');
  }

  async find({
    skip,
    take
  }) {
    const user = await this.ormRepository.find({
      skip,
      take
    });
    return user;
  }

  async create(userData) {
    const user = this.ormRepository.create(userData);
    console.log("CREATE => ", user);
    await this.ormRepository.save(user);
    console.log("SAVE => ", user);
    return user;
  }

  async save(user) {
    const newUser = await this.ormRepository.save(user);
    return newUser;
  }

  async findById(id) {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email) {
    console.log("EMAIL => ", email);
    const user = await this.ormRepository.findOne({
      email: email
    });
    console.log("USER 01 => ", user);
    return user;
  }

  async findByItem(data) {
    console.log("DATA => ", data);
    const user = await this.ormRepository.findOne({
      username: data
    });
    console.log("USER 01 data => ", user);
    return user;
  }

  async findByEmail2(email) {
    const user = await this.ormRepository.findOne({
      email: email
    });
    return user ? true : false;
  }

  async findByUsername(username) {
    const user = await this.ormRepository.findOne({
      username: username
    });
    return user ? true : false;
  }

}

exports.default = UsersRepository;