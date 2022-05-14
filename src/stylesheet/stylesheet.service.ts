import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from '../site/site.entity';
import { Page } from '../page/page.entity';
import { Style } from '../style/style.entity';

@Injectable()
export class StylesheetService {
  constructor(
    @InjectRepository(Site) private siteRepo: Repository<Site>,
    @InjectRepository(Page) private pageRepo: Repository<Page>,
    @InjectRepository(Style) private repo: Repository<Style>,
  ) {}

  async getPageStyleSheet(UUID: string) {
    const page = await this.getPage(UUID);
    const styles = await this.repo.find({
      where: { PageId: page.Id },
      relations: ['Selectors', 'Rules'],
      order: {
        Order: 'ASC',
      },
    });
    let stylesheet = '';
    for (let style of styles) {
      if (style.Selectors.length && style.Rules.length) {
        style.Selectors.sort((a,b) => a.Order - b.Order)
        style.Rules.sort((a,b) => a.Order - b.Order)
        stylesheet += style.Selectors.map((s) => s.Name).join(',\n');
        stylesheet += ' {\n';
        for (let rule of style.Rules) {
          stylesheet += `\t${rule.Property}:${rule.Value};\n`;
        }
        stylesheet += '}\n';
      } else {
        continue;
      }
    }
    return stylesheet;
  }

  async getSiteStyleSheet(UUID: string) {
    const site = await this.getSite(UUID);
    const styles = await this.repo.find({
      where: { SiteId: site.Id },
      relations: ['Selectors', 'Rules'],
      order: {
        Order: 'ASC',
      },
    });
    let stylesheet = '';
    for (let style of styles) {
      if (style.Selectors.length && style.Rules.length) {
        style.Selectors.sort((a,b) => a.Order - b.Order)
        style.Rules.sort((a,b) => a.Order - b.Order)
        stylesheet += style.Selectors.map((s) => s.Name).join(',\n');
        stylesheet += ' {\n';
        for (let rule of style.Rules) {
          stylesheet += `\t${rule.Property}:${rule.Value};\n`;
        }
        stylesheet += '}\n';
      } else {
        continue;
      }
    }
    return stylesheet;
  }

  async getPage(UUID: string) {
    return await this.pageRepo.findOne({ where: { UUID } });
  }

  async getSite(UUID: string) {
    return await this.siteRepo.findOne({ where: { UUID } });
  }
}
