"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUsers1611061632610 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        isNullable: false,
        default: 'uuid_generate_v4()'
      }, {
        name: 'username',
        type: 'varchar',
        isUnique: true,
        isNullable: false
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true,
        isNullable: false
      }, {
        name: 'password',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'comfirmation_password',
        type: 'boolean',
        default: false,
        isNullable: true
      }, {
        name: 'avatar',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }

}

exports.default = CreateUsers1611061632610;