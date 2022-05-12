import { BaseModel } from '../global/base/base-model.abstract';
import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Site } from '../site/site.entity';

const SaltRounds = 10;

@Entity()
export class User extends BaseModel {
  @Column()
  Name: string;

  @Column()
  Email: string;

  @Column({ select: false })
  PassWord: string;

  @OneToMany((type) => Site, (site) => site.User)
  Sites: Site[];

  setEncryptedPassWord(password: string) {
    this.PassWord = bcrypt.hashSync(password, SaltRounds);
  }

  validatePassWord(password: string) {
    if (!password || !this.PassWord) return false;
    return bcrypt.compareSync(password, this.PassWord);
  }

  changePassWord(oldPass: string, newPass: string, confirmation: string) {
    if (this.validatePassWord(oldPass)) {
      if (newPass === confirmation) {
        this.setEncryptedPassWord(newPass);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  @BeforeInsert()
  initialPassWordEncrypt() {
    const { PassWord } = this;
    if (PassWord) {
      this.setEncryptedPassWord(PassWord);
    }
  }
}
