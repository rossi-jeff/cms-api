import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Selector } from './selector.entity';
import { CreateSelectorDto } from '../global/dto';
import * as _ from 'lodash';

@Injectable()
export class SelectorService {
  constructor(@InjectRepository(Selector) private repo: Repository<Selector>) {}

  async createSelector(DTO: CreateSelectorDto, StyleId: number) {
    const selector = new Selector();
    _.merge(selector, DTO);
    selector.StyleId = StyleId;
    return await this.repo.save(selector);
  }

  async showSelector(UUID: string) {
    const selector = await this.repo.findOne({ where: { UUID } });
    if (!selector) {
      throw new NotFoundException(`No selector found with UUID ${UUID}`);
    }
    return selector;
  }

  async updateSelector(UUID: string, DTO: CreateSelectorDto) {
    const selector = await this.showSelector(UUID);
    _.merge(selector, DTO);
    return await this.repo.save(selector);
  }

  async deleteSelector(UUID: string) {
    const selector = await this.showSelector(UUID);
    await this.repo.remove(selector);
    return selector.Id === null;
  }

  async deleteByStyleId(StyleId: number) {
    return await this.repo.delete({ StyleId });
  }
}
