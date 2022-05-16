import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class addPageTable1652713626172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'page',
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
          // page columns
          {
            name: 'Name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Slug',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'SiteId',
            type: 'int',
            isNullable: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('page');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'page',
        new TableIndex({
          name: 'IDX-UUID',
          columnNames: ['UUID'],
          isUnique: false,
        }),
      );
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-SiteId');
    if (!indexKey2) {
      await queryRunner.createIndex(
        'page',
        new TableIndex({
          name: 'IDX-SiteId',
          columnNames: ['SiteId'],
          isUnique: false,
        }),
      );
    }
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('SiteId') !== -1,
    );
    if (!foreignKey1) {
      await queryRunner.createForeignKey(
        'page',
        new TableForeignKey({
          name: `FK-page-SiteId`,
          columnNames: ['SiteId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'site',
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('page');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('SiteId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('page', foreignKey1);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (indexKey1) {
      await queryRunner.dropIndex('page', 'IDX-UUID');
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-SiteId');
    if (indexKey2) {
      await queryRunner.dropIndex('page', 'IDX-SiteId');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'page',
      }),
      true,
    );
  }
}
