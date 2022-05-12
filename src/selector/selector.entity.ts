import { BaseModel } from '../global/base/base-model.abstract';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Style } from '../style/style.entity';

@Entity()
export class Selector extends BaseModel {
  @Column()
  Name: string;

  @Column({ default: 0 })
  Order: number;

  @Column({ type: 'bigint' })
  StyleId: number;

  @ManyToOne((type) => Style)
  @JoinColumn({ name: 'StyleId' })
  Style: Style;
}
