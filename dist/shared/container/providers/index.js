"use strict";

var _tsyringe = require("tsyringe");

var _mail = _interopRequireDefault(require("../../../config/mail"));

var _DiskStorageProvider = _interopRequireDefault(require("./StorageProvider/implementations/DiskStorageProvider"));

var _EtherealMailProvider = _interopRequireDefault(require("./MailProvider/implementations/EtherealMailProvider"));

var _GmailProvider = _interopRequireDefault(require("./MailProvider/implementations/GmailProvider"));

var _HandlebarsMailTemplateProvider = _interopRequireDefault(require("./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('StorageProvider', _DiskStorageProvider.default);

_tsyringe.container.registerSingleton('MailTemplateProvider', _HandlebarsMailTemplateProvider.default);

_tsyringe.container.registerInstance('MailProvider', _mail.default.driver == 'ethereal' ? _tsyringe.container.resolve(_EtherealMailProvider.default) : _tsyringe.container.resolve(_GmailProvider.default));