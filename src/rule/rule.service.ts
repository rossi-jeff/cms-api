import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rule } from './rule.entity';
import { CreateRuleDto } from '../global/dto';
import * as _ from 'lodash';

@Injectable()
export class RuleService {
  constructor(@InjectRepository(Rule) private repo: Repository<Rule>) {}

  async createRule(DTO: CreateRuleDto, StyleId: number) {
    const rule = new Rule();
    _.merge(rule, DTO);
    rule.StyleId = StyleId;
    return await this.repo.save(rule);
  }

  async showRule(UUID: string) {
    const rule = await this.repo.findOne({ where: { UUID } });
    if (!rule) {
      throw new NotFoundException(`No rule found with UUID ${UUID}`);
    }
    return rule;
  }

  async updateRule(UUID: string, DTO: CreateRuleDto) {
    const rule = await this.showRule(UUID);
    _.merge(rule, DTO);
    return await this.repo.save(rule);
  }

  async deleteRule(UUID: string) {
    const rule = await this.showRule(UUID);
    await this.repo.remove(rule);
    return rule.Id === null;
  }

  async deleteByStyleId(StyleId: number) {
    return await this.repo.delete({ StyleId });
  }
}
