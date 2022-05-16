import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class addPageRowTable1652726197778 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'page_row',
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
          // page row columns
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
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('page_row');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'page_row',
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
        'page_row',
        new TableIndex({
          name: 'IDX-PageId',
          columnNames: ['PageId'],
          isUnique: false,
        }),
      );
    }
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('PageId') !== -1,
    );
    if (!foreignKey1) {
      await queryRunner.createForeignKey(
        'page_row',
        new TableForeignKey({
          name: `FK-page_row-PageId`,
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
    const table = await queryRunner.getTable('page_row');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('PageId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('page_row', foreignKey1);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (indexKey1) {
      await queryRunner.dropIndex('page_row', 'IDX-UUID');
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-PageId');
    if (indexKey2) {
      await queryRunner.dropIndex('page_row', 'IDX-PageId');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'page_row',
      }),
      true,
    );
  }
}
