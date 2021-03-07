"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _AuthenticateUser = _interopRequireDefault(require("../../../services/AuthenticateUser.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;
    console.log("NEW SESSION");

    const authenticateUser = _tsyringe.container.resolve(_AuthenticateUser.default);

    const {
      user,
      token
    } = await authenticateUser.execute({
      email,
      password
    }); // @ts-expect-error

    delete user.password;
    return response.json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

}

exports.default = SessionsController;