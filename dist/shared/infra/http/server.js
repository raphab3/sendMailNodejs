"use strict";

require("reflect-metadata");

require("dotenv/config");

require("../typeorm");

require("../../container");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _routes = _interopRequireDefault(require("./routes"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PORT = 5555;
const corsoptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

}; // CORS

app.use((req, res, next) => {
  // app.use(_cors.default);

  if (res) {
    console.log("Passou pelo CORS");
  }

  next();
});

// const page = path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'static');
// app.use('/', express.static(page));
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use('/files', _express.default.static(_upload.default.uploadsFolder));
app.use(_express.default.json());
app.use("/api/v1", (0, _cors.default)(corsoptions), _routes.default); // Middlewares Global de Erros
// eslint-disable-next-line @typescript-eslint/no-unused-vars

app.use((err, request, response, _) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
app.listen(`${PORT}`, () => {
  console.log(`SERVER ON TO PORT => ${PORT}`);
});
