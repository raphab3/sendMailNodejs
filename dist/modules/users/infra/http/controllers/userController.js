"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _usersCreate = _interopRequireDefault(require("../../../services/usersCreate.service"));

var _usersDelete = _interopRequireDefault(require("../../../services/usersDelete.service"));

var _usersFind = _interopRequireDefault(require("../../../services/usersFind.service"));

var _usersFindById = _interopRequireDefault(require("../../../services/usersFindById.service"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async index(request, response) {
    const userService = _tsyringe.container.resolve(_usersFind.default); // Paginação skip => numero da página, take => quantos por página


    let {
      skip,
      take
    } = request.query;
    skip = parseInt(skip);
    take = parseInt(take);
    const user = await userService.execute({
      skip,
      take
    });
    let total = 0;
    user.forEach(() => {
      total++;
    });
    return response.status(200).json({
      data: user,
      total: total
    });
  }

  async show(request, response) {
    const {
      id
    } = request.params;

    const userFind = _tsyringe.container.resolve(_usersFindById.default);

    const user = await userFind.execute({
      id
    });
    console.log("USER => ", user);
    return response.status(200).json(user);
  }

  async create(request, response) {
    const {
      username,
      email,
      password
    } = request.body;
    console.log("CREATE USER => ", {
      username,
      email,
      password
    });

    const createUser = _tsyringe.container.resolve(_usersCreate.default);

    const user = await createUser.execute({
      username,
      email,
      password
    });
    console.log("CREATE USER SERVICE => ", user);
    return response.status(200).json({
      data: user
    });
  }

  async delete(request, response) {
    const {
      id
    } = request.body;

    const deleteUser = _tsyringe.container.resolve(_usersDelete.default);

    await deleteUser.execute({
      id
    });
    return response.status(204).json({
      msg: "User delete success"
    });
  }

}

exports.default = UserController;