"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCadastradosTable1614973582927 = void 0;

var _typeorm = require("typeorm");

class CreateCadastradosTable1614973582927 {
  async up(queryRunner) {
    queryRunner.createTable(new _typeorm.Table({
      name: "cadastrados",
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        isNullable: false,
        default: 'uuid_generate_v4()'
      }, {
        name: 'full_name',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'email',
        type: 'varchar',
        isNullable: false
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
    await queryRunner.dropTable("cadastrados");
  }

}

exports.CreateCadastradosTable1614973582927 = CreateCadastradosTable1614973582927;