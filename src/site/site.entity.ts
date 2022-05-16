import { BaseModel } from '../global/base/base-model.abstract';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Page } from '../page/page.entity';
import { Style } from '../style/style.entity';

@Entity()
export class Site extends BaseModel {
  @Column()
  Name: string;

  @Column({ type: 'int' })
  UserId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'UserId' })
  User: User;

  @OneToMany((type) => Page, (page) => page.Site)
  Pages: Page[];

  @OneToMany((type) => Style, (style) => style.Site)
  Styles: Style[];
}
