import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class addPageColumnTable1652726833803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'page_column',
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
          // page column columns
          {
            name: 'Content',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'Order',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'RowId',
            type: 'int',
            isNullable: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('page_column');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'page_column',
        new TableIndex({
          name: 'IDX-UUID',
          columnNames: ['UUID'],
          isUnique: false,
        }),
      );
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-RowId');
    if (!indexKey2) {
      await queryRunner.createIndex(
        'page_column',
        new TableIndex({
          name: 'IDX-RowId',
          columnNames: ['RowId'],
          isUnique: false,
        }),
      );
    }
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('RowId') !== -1,
    );
    if (!foreignKey1) {
      await queryRunner.createForeignKey(
        'page_column',
        new TableForeignKey({
          name: `FK-page_column-RowId`,
          columnNames: ['RowId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'page_row',
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('page_column');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('RowId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('page_column', foreignKey1);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (indexKey1) {
      await queryRunner.dropIndex('page_column', 'IDX-UUID');
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-RowId');
    if (indexKey2) {
      await queryRunner.dropIndex('page_column', 'IDX-RowId');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'page_column',
      }),
      true,
    );
  }
}
