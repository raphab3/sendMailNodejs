"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _cadastradosController = _interopRequireDefault(require("../controllers/cadastradosController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cadastradosRouter = (0, _express.Router)();
const cadastradosController = new _cadastradosController.default(); // cadastradosRouter.use(ensureAuthenticated)
// find all
//Carregar CSV

cadastradosRouter.get('/csv', cadastradosController.csv);
cadastradosRouter.get('/certificado', cadastradosController.certificado);
cadastradosRouter.get('/', cadastradosController.index); // find by id

cadastradosRouter.get('/:id', cadastradosController.show); // new people

cadastradosRouter.post('/', cadastradosController.create);
var _default = cadastradosRouter;
exports.default = _default;