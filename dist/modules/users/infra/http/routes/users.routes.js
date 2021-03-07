"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _express = require("express");

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middleware/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const userController = new _userController.default();
const userAvatarController = new _UserAvatarController.default();
const upload = (0, _multer.default)(_upload.default.multer); // find all

usersRouter.get('/', userController.index); // find by id

usersRouter.get('/:id', userController.show); // create user

usersRouter.post('/', userController.create); // delete people

usersRouter.delete('/:id', userController.delete);
usersRouter.patch('/avatar', _ensureAuthenticated.default, upload.single('avatar'), userAvatarController.update);
var _default = usersRouter;
exports.default = _default;