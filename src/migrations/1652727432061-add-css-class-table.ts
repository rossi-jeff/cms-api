import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class addCssClassTable1652727432061 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'css_class',
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
          // css class columns
          {
            name: 'Name',
            type: 'varchar',
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
          {
            name: 'ColumnId',
            type: 'int',
            isNullable: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('css_class');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'css_class',
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
        'css_class',
        new TableIndex({
          name: 'IDX-RowId',
          columnNames: ['RowId'],
          isUnique: false,
        }),
      );
    }
    const indexKey3 = table.indices.find((idx) => idx.name === 'IDX-ColumnId');
    if (!indexKey3) {
      await queryRunner.createIndex(
        'css_class',
        new TableIndex({
          name: 'IDX-ColumnId',
          columnNames: ['ColumnId'],
          isUnique: false,
        }),
      );
    }
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('RowId') !== -1,
    );
    if (!foreignKey1) {
      await queryRunner.createForeignKey(
        'css_class',
        new TableForeignKey({
          name: `FK-css_class-RowId`,
          columnNames: ['RowId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'page_row',
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        }),
      );
    }
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('ColumnId') !== -1,
    );
    if (!foreignKey2) {
      await queryRunner.createForeignKey(
        'css_class',
        new TableForeignKey({
          name: `FK-css_class-ColumnId`,
          columnNames: ['ColumnId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'page_column',
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('css_class');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('RowId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('css_class', foreignKey1);
    }
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('ColumnId') !== -1,
    );
    if (foreignKey2) {
      await queryRunner.dropForeignKey('css_class', foreignKey2);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (indexKey1) {
      await queryRunner.dropIndex('css_class', 'IDX-UUID');
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-RowId');
    if (indexKey2) {
      await queryRunner.dropIndex('css_class', 'IDX-RowId');
    }
    const indexKey3 = table.indices.find((idx) => idx.name === 'IDX-ColumnId');
    if (indexKey3) {
      await queryRunner.dropIndex('css_class', 'IDX-ColumnId');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'css_class',
      }),
      true,
    );
  }
}
