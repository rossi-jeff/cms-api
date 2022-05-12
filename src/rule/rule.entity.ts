import { BaseModel } from '../global/base/base-model.abstract';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Style } from '../style/style.entity';

@Entity()
export class Rule extends BaseModel {
  @Column()
  Property: string;

  @Column()
  Value: string;

  @Column({ default: 0 })
  Order: number;

  @Column({ type: 'bigint' })
  StyleId: number;

  @ManyToOne((type) => Style)
  @JoinColumn({ name: 'StyleId' })
  Style: Style;
}
