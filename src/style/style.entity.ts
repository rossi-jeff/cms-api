import { BaseModel } from '../global/base/base-model.abstract';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Page } from '../page/page.entity';
import { Site } from '../site/site.entity';
import { Selector } from '../selector/selector.entity';
import { Rule } from '../rule/rule.entity';

@Entity()
export class Style extends BaseModel {
  @Column({ default: 0 })
  Order: number;

  @Column({ type: 'bigint', nullable: true })
  PageId: number;

  @ManyToOne((type) => Page)
  @JoinColumn({ name: 'PageId' })
  Page: Page;

  @Column({ type: 'bigint', nullable: true })
  SiteId: number;

  @ManyToOne((type) => Site)
  @JoinColumn({ name: 'SiteId' })
  Site: Site;

  @OneToMany((type) => Selector, (selector) => selector.Style)
  Selectors: Selector[];

  @OneToMany((type) => Rule, (rule) => rule.Style)
  Rules: Rule[];
}
