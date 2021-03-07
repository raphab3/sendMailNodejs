import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUsers1611061632610 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          isNullable: false,
          default: 'uuid_generate_v4()'
        },
        {
          name: 'username',
          type: 'varchar',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'comfirmation_password',
          type: 'boolean',
          default: false,
          isNullable: true,
        },
        {
          name: 'avatar',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }

}
