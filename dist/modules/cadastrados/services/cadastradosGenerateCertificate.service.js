"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ICadastradosRepository = _interopRequireDefault(require("../repositories/ICadastradosRepository"));

var _imageToBase = _interopRequireDefault(require("image-to-base64"));

var _jspdf = require("jspdf");

var _fs = _interopRequireDefault(require("fs"));

var _crypto = _interopRequireDefault(require("crypto"));

var _path = _interopRequireDefault(require("path"));

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CadastradosGeneateCertificateService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CadastradosRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default, typeof _ICadastradosRepository.default === "undefined" ? Object : _ICadastradosRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CadastradosGeneateCertificateService {
  constructor(mailProvider, cadastradosRepository) {
    this.mailProvider = mailProvider;
    this.cadastradosRepository = cadastradosRepository;
  }

  async execute({
    full_name,
    email
  }) {
    console.log("DADOS SERVICE --", {
      full_name,
      email
    });
    const cadastrado = await this.cadastradosRepository.findByEmail(email);

    if (!cadastrado) {
      throw new _AppError.default("User not found!", 404);
    }

    let pdf = "";
    pdf = await this.gerarPDF("files/certificado.png", full_name);
    pdf = await pdf.split(';base64,').pop();

    const pathCertificado = _path.default.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp', 'uploads', 'certificados');

    const filehash = _crypto.default.randomBytes(10).toString('hex');

    const fileName = `${filehash}${Date.now()}.pdf`;

    _fs.default.writeFile(`${pathCertificado}/${fileName}`, pdf, {
      encoding: 'base64'
    }, err => {
      console.log('File created');
    });

    const certificadoTemplate = _path.default.resolve(__dirname, '..', 'views', 'certificado.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: full_name,
        email: email
      },
      subject: 'Gerando Certificado',
      templateData: {
        file: certificadoTemplate,
        variables: {
          name: full_name,
          img: "https://static.wixstatic.com/media/4bac15_f5f41e82fb4d4a489e4fec78e3efc0a6~mv2.png/v1/fill/w_153,h_153,al_c,q_85,usm_0.66_1.00_0.01/brasao_icone.webp",
          link: `${process.env.APP_API_URL}/files/certificados/${fileName}`
        }
      }
    });
    console.log("this.mailProvider => ", this.mailProvider);
    return cadastrado;
  }

  async gerarPDF(file_url, nome) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async resolve => {
      (0, _imageToBase.default)(file_url) // Path to the image
      .then(imgData => {
        // console.log(imgData); // "cGF0aC90by9maWxlLmpwZw=="
        const doc = new _jspdf.jsPDF({
          orientation: "landscape"
        });
        doc.setFontSize(30);
        doc.addImage(imgData, "JPEG", 8, 15, 280, 180);
        const splitTitle = doc.splitTextToSize(`${nome}`, 180);
        doc.text(splitTitle, 24, 100);
        doc.autoPrint(); // doc.output('bloburi');
        // let url =  doc.output('arraybuffer')

        let url = doc.output("dataurlstring");
        url = url.replace(/^data:image\/(png|jpg);base64,/, "");
        resolve(url);
      }).catch(error => {
        console.log(error); // Logs an error if there was one
      });
    });
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CadastradosGeneateCertificateService;