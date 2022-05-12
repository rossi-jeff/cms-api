import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './site.entity';
import { CreateSiteDto, CreateStyleDto, CreatePageDto } from '../global/dto';
import * as _ from 'lodash';
import { StyleService } from '../style/style.service';
import { PageService } from '../page/page.service';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private repo: Repository<Site>,
    private styleService: StyleService,
    private pageService: PageService,
  ) {}

  async getSites(UserId: number) {
    return await this.repo.find({ where: { UserId } });
  }

  async showSite(UUID: string) {
    const site = await this.repo.findOne({ where: { UUID } });
    if (!site) {
      throw new NotFoundException(`No site found with UUID ${UUID}`);
    }
    return site;
  }

  async createSite(DTO: CreateSiteDto, UserId: number) {
    const site = new Site();
    _.merge(site, DTO);
    site.UserId = UserId;
    return await this.repo.save(site);
  }

  async updateSite(UUID: string, DTO: CreateSiteDto) {
    const site = await this.showSite(UUID);
    _.merge(site, DTO);
    return await this.repo.save(site);
  }

  async deleteSite(UUID: string) {
    const site = await this.showSite(UUID);
    await this.repo.remove(site);
    return site.Id === null;
  }

  async getStyles(UUID: string) {
    const site = await this.showSite(UUID);
    return await this.styleService.getSiteStyles(site.Id);
  }

  async createStyle(UUID: string, DTO: CreateStyleDto) {
    const site = await this.showSite(UUID);
    return await this.styleService.createSiteStyle(DTO, site.Id);
  }

  async getPages(UUID: string) {
    const site = await this.showSite(UUID);
    return await this.pageService.getPages(site.Id);
  }

  async createPage(UUID: string, DTO: CreatePageDto) {
    const site = await this.showSite(UUID);
    return await this.pageService.createPage(DTO, site.Id);
  }
}
