import { BaseModel } from '../global/base/base-model.abstract';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Page } from '../page/page.entity';
import { CssClass } from '../css-class/css-class.entity';
import { PageColumn } from '../column/column.entity';

@Entity()
export class PageRow extends BaseModel {
  @Column({ default: 0 })
  Order: number;

  @Column({ type: 'bigint' })
  PageId: number;

  @ManyToOne((type) => Page)
  @JoinColumn({ name: 'PageId' })
  Page: Page;

  @OneToMany((type) => CssClass, (cls) => cls.Row)
  CssClasses: CssClass[];

  @OneToMany((type) => PageColumn, (column) => column.Row)
  Columns: PageColumn[];
}
