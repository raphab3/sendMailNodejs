"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _promiseFs = _interopRequireDefault(require("promise-fs"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fs from 'fs'
class DiskStorageProvider {
  async saveFile(file) {
    await _promiseFs.default.rename(_path.default.resolve(_upload.default.tmpFolder, file), _path.default.resolve(_upload.default.uploadsFolder, file));
    return file;
  }

  async deleteFile(file) {
    const filePath = _path.default.resolve(_upload.default.uploadsFolder, file);

    try {
      await _promiseFs.default.stat(filePath);
    } catch {
      return;
    }

    await _promiseFs.default.unlink(filePath);
  }

}

var _default = DiskStorageProvider;
exports.default = _default;