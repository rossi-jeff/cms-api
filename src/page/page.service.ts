import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './page.entity';
import * as _ from 'lodash';
import { CreatePageDto, CreateStyleDto, CreateRowDto } from '../global/dto';
import { StyleService } from '../style/style.service';
import { RowService } from '../row/row.service';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page) private repo: Repository<Page>,
    private styleService: StyleService,
    private rowService: RowService,
  ) {}

  async getPages(SiteId: number) {
    return await this.repo.find({ where: { SiteId } });
  }

  async createPage(DTO: CreatePageDto, SiteId: number) {
    const page = new Page();
    _.merge(page, DTO);
    page.SiteId = SiteId;
    return await this.repo.save(page);
  }

  async showPage(UUID: string, relations: string[] = ['Site']) {
    const page = await this.repo.findOne({ where: { UUID }, relations });
    if (!page) {
      throw new NotFoundException(`No page found with UUID ${UUID}`);
    }
    return page;
  }

  async updatePage(UUID: string, DTO: CreatePageDto) {
    const page = await this.showPage(UUID, []);
    _.merge(page, DTO);
    await this.repo.save(page);
    return await this.showPage(UUID);
  }

  async deletePage(UUID: string) {
    const page = await this.showPage(UUID, []);
    await this.repo.remove(page);
    return page.Id === null;
  }

  async getStyles(UUID: string) {
    const page = await this.showPage(UUID, []);
    return await this.styleService.getPageStyles(page.Id);
  }

  async createStyle(UUID: string, DTO: CreateStyleDto) {
    const page = await this.showPage(UUID, []);
    return await this.styleService.createPageStyle(DTO, page.Id);
  }

  async getRows(UUID: string) {
    const page = await this.showPage(UUID, []);
    return await this.rowService.getRows(page.Id);
  }

  async createRow(UUID: string, DTO: CreateRowDto) {
    const page = await this.showPage(UUID, []);
    return await this.rowService.createRow(DTO, page.Id);
  }
}
