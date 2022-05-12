import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from '../global/dto';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async showUser(UUID: string) {
    const user = await this.repo.findOne({ where: { UUID } });
    if (!user) {
      throw new NotFoundException(`No user found with UUID ${UUID}`);
    }
    return user;
  }

  async updateUser(UUID: string, DTO: UpdateUserDto) {
    const user = await this.showUser(UUID);
    _.merge(user, DTO);
    return await this.repo.save(user);
  }

  async deleteUser(UUID: string) {
    const user = await this.showUser(UUID);
    await this.repo.remove(user);
    return user.Id === null;
  }
}
