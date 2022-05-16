import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class addCssStyleTable1652714798176 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'style',
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
          // style columns
          {
            name: 'Order',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'PageId',
            type: 'int',
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
    const table = await queryRunner.getTable('style');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'style',
        new TableIndex({
          name: 'IDX-UUID',
          columnNames: ['UUID'],
          isUnique: false,
        }),
      );
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-PageId');
    if (!indexKey2) {
      await queryRunner.createIndex(
        'style',
        new TableIndex({
          name: 'IDX-PageId',
          columnNames: ['PageId'],
          isUnique: false,
        }),
      );
    }
    const indexKey3 = table.indices.find((idx) => idx.name === 'IDX-SiteId');
    if (!indexKey3) {
      await queryRunner.createIndex(
        'style',
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
        'style',
        new TableForeignKey({
          name: `FK-style-SiteId`,
          columnNames: ['SiteId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'site',
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        }),
      );
    }
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('PageId') !== -1,
    );
    if (!foreignKey2) {
      await queryRunner.createForeignKey(
        'style',
        new TableForeignKey({
          name: `FK-style-PageId`,
          columnNames: ['PageId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'page',
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('style');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('SiteId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('style', foreignKey1);
    }
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('PageId') !== -1,
    );
    if (foreignKey2) {
      await queryRunner.dropForeignKey('style', foreignKey2);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (indexKey1) {
      await queryRunner.dropIndex('style', 'IDX-UUID');
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-PageId');
    if (indexKey2) {
      await queryRunner.dropIndex('style', 'IDX-PageId');
    }
    const indexKey3 = table.indices.find((idx) => idx.name === 'IDX-SiteId');
    if (indexKey3) {
      await queryRunner.dropIndex('style', 'IDX-SiteId');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'style',
      }),
      true,
    );
  }
}
