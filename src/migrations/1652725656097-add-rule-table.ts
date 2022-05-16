import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class addRuleTable1652725656097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rule',
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
          // rule columns
          {
            name: 'Property',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Value',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Order',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'StyleId',
            type: 'int',
            isNullable: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('rule');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'rule',
        new TableIndex({
          name: 'IDX-UUID',
          columnNames: ['UUID'],
          isUnique: false,
        }),
      );
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-StyleId');
    if (!indexKey2) {
      await queryRunner.createIndex(
        'rule',
        new TableIndex({
          name: 'IDX-StyleId',
          columnNames: ['StyleId'],
          isUnique: false,
        }),
      );
    }
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('StyleId') !== -1,
    );
    if (!foreignKey1) {
      await queryRunner.createForeignKey(
        'rule',
        new TableForeignKey({
          name: `FK-rule-StyleId`,
          columnNames: ['StyleId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'style',
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('rule');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('StyleId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('rule', foreignKey1);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UUID');
    if (indexKey1) {
      await queryRunner.dropIndex('rule', 'IDX-UUID');
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-StyleId');
    if (indexKey2) {
      await queryRunner.dropIndex('rule', 'IDX-StyleId');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'rule',
      }),
      true,
    );
  }
}
