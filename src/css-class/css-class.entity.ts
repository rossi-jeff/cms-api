import { BaseModel } from '../global/base/base-model.abstract';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PageRow } from '../row/row.entity';
import { PageColumn } from '../column/column.entity';

@Entity()
export class CssClass extends BaseModel {
  @Column()
  Name: string;

  @Column({ default: 0 })
  Order: number;

  @Column({ type: 'bigint', nullable: true })
  RowId: number;

  @ManyToOne((type) => PageRow)
  @JoinColumn({ name: 'RowId' })
  Row: PageRow;

  @Column({ type: 'bigint', nullable: true })
  ColumnId: number;

  @ManyToOne((type) => PageColumn)
  @JoinColumn({ name: 'ColumnId' })
  Column: PageColumn;
}
