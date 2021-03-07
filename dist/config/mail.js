"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal' || 'gmail',
  defaults: {
    from: {
      email: 'seu@email.com',
      name: 'Seu Nome'
    }
  }
};
exports.default = _default;