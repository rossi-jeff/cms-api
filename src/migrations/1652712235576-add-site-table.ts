import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class addSiteTable1652712235576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'site',
        columns: [
          // base model columns
          {
            name: 'Id',
            type: 'int',
            length: '11',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'UUID',
            type: 'varchar',
            length: '40',
            isNullable: true,
          },
          {
            name: 'Version',
            type: 'int',
            length: '11',
            isNullable: false,
            default: '1',
          },
          {
            name: 'Created',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'Updated',
            type: 'timestamp',
            isNullable: false,
            default: '0',
          },
          // site columns
          {
            name: 'Name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'UserId',
            type: 'int',
            isNullable: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('site');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'site',
        new TableIndex({
          name: 'IDX-UUID',
          columnNames: ['UUID'],
          isUnique: false,
        }),
      );
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-UserId');
    if (!indexKey2) {
      await queryRunner.createIndex(
        'site',
        new TableIndex({
          name: 'IDX-UserId',
          columnNames: ['UserId'],
          isUnique: false,
        }),
      );
    }
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('UserId') !== -1,
    );
    if (!foreignKey1) {
      await queryRunner.createForeignKey(
        'site',
        new TableForeignKey({
          name: `FK-site-UserId`,
          columnNames: ['UserId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'user',
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('site');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('UserId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('site', foreignKey1);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (indexKey1) {
      await queryRunner.dropIndex('site', 'IDX-UUID');
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-UserId');
    if (indexKey2) {
      await queryRunner.dropIndex('site', 'IDX-UserId');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'site',
      }),
      true,
    );
  }
}
