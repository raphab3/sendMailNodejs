"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateUserAvatar = _interopRequireDefault(require("../../../services/UpdateUserAvatar.service"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAvatarController {
  async update(request, response) {
    const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatar.default);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    console.log(request.file);
    const userWithoutPassword = {
      id: user.id,
      name: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
    return response.json(userWithoutPassword);
  }

}

exports.default = UserAvatarController;