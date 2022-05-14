import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Style } from './style.entity';
import {
  CreateStyleDto,
  CreateSelectorDto,
  CreateRuleDto,
  SortDto,
} from '../global/dto';
import * as _ from 'lodash';
import { SelectorService } from '../selector/selector.service';
import { RuleService } from '../rule/rule.service';

@Injectable()
export class StyleService {
  constructor(
    @InjectRepository(Style) private repo: Repository<Style>,
    private selectorService: SelectorService,
    private ruleService: RuleService,
  ) {}

  async getSiteStyles(SiteId: number) {
    return await this.repo.find({
      where: { SiteId },
      relations: ['Selectors', 'Rules'],
    });
  }

  async getPageStyles(PageId: number) {
    return await this.repo.find({
      where: { PageId },
      relations: ['Selectors', 'Rules'],
    });
  }

  async createSiteStyle(DTO: CreateStyleDto, SiteId: number) {
    const style = new Style();
    _.merge(style, DTO);
    style.SiteId = SiteId;
    return await this.repo.save(style);
  }

  async createPageStyle(DTO: CreateStyleDto, PageId: number) {
    const style = new Style();
    _.merge(style, DTO);
    style.PageId = PageId;
    return await this.repo.save(style);
  }

  async showStyle(UUID: string, relations: string[] = ['Selectors', 'Rules']) {
    const style = await this.repo.findOne({ where: { UUID } });
    if (!style) {
      throw new NotFoundException(`No style found with UUID ${UUID}`);
    }
    return style;
  }

  async updateStyle(UUID: string, DTO: CreateStyleDto) {
    const style = await this.showStyle(UUID, []);
    _.merge(style, DTO);
    await this.repo.save(style);
    return await this.showStyle(UUID);
  }

  async deleteStyle(UUID: string) {
    const style = await this.showStyle(UUID, []);
    await this.selectorService.deleteByStyleId(style.Id);
    await this.ruleService.deleteByStyleId(style.Id);
    await this.repo.remove(style);
    return style.Id === null;
  }

  async createSelector(UUID: string, DTO: CreateSelectorDto) {
    const style = await this.showStyle(UUID, []);
    return await this.selectorService.createSelector(DTO, style.Id);
  }

  async createRule(UUID: string, DTO: CreateRuleDto) {
    const style = await this.showStyle(UUID, []);
    return await this.ruleService.createRule(DTO, style.Id);
  }

  async sortStyles(DTO: SortDto) {
    const { Sorted } = DTO;
    let Order = 0;
    for (let Id of Sorted) {
      await this.repo.update({ Id }, { Order });
      Order++;
    }
  }
}
