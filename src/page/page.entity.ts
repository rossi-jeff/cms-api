import { BaseModel } from '../global/base/base-model.abstract';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Site } from '../site/site.entity';
import { Style } from '../style/style.entity';
import { PageRow } from '../row/row.entity';

@Entity()
export class Page extends BaseModel {
  @Column()
  Name: string;

  @Column()
  Slug: string;

  @Column({ type: 'int' })
  SiteId: number;

  @ManyToOne((type) => Site)
  @JoinColumn({ name: 'SiteId' })
  Site: Site;

  @OneToMany((type) => Style, (style) => style.Page)
  Styles: Style[];

  @OneToMany((type) => PageRow, (row) => row.Page)
  Rows: PageRow[];

  @BeforeInsert()
  checkSlug() {
    if (!this.Slug) {
      this.Slug = this.Name.toLowerCase().replace(/\s/g, '_');
    }
  }
}
