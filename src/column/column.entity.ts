import { BaseModel } from '../global/base/base-model.abstract';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { PageRow } from '../row/row.entity';
import { CssClass } from '../css-class/css-class.entity';

@Entity()
export class PageColumn extends BaseModel {
  @Column({ type: 'text' })
  Content: string;

  @Column({ default: 0 })
  Order: number;

  @Column({ type: 'bigint' })
  RowId: number;

  @ManyToOne((type) => PageRow)
  @JoinColumn({ name: 'RowId' })
  Row: PageRow;

  @OneToMany((type) => CssClass, (cls) => cls.Column)
  CssClasses: CssClass[];
}
