import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CssClass } from './css-class.entity';
import { CreateCssClassDbDto, CreateCssClassDto } from '../global/dto';
import * as _ from 'lodash';

@Injectable()
export class CssClassService {
  constructor(@InjectRepository(CssClass) private repo: Repository<CssClass>) {}

  async getRowClasses(RowId: number) {
    return await this.repo.find({ where: { RowId }, order: { Order: 'ASC' } });
  }

  async getColumnClasses(ColumnId: number) {
    return await this.repo.find({
      where: { ColumnId },
      order: { Order: 'ASC' },
    });
  }

  async createCssClass(DTO: CreateCssClassDbDto) {
    const css_class = new CssClass();
    _.merge(css_class, DTO);
    return await this.repo.save(css_class);
  }

  async showCssClass(UUID: string) {
    const css_class = await this.repo.findOne({ where: { UUID } });
    if (!css_class) {
      throw new NotFoundException(`No CSS Class found with UUID ${UUID}`);
    }
    return css_class;
  }

  async updateCssClass(UUID: string, DTO: CreateCssClassDto) {
    const css_class = await this.showCssClass(UUID);
    _.merge(css_class, DTO);
    return await this.repo.save(css_class);
  }

  async deleteCssClass(UUID: string) {
    const css_class = await this.showCssClass(UUID);
    await this.repo.remove(css_class);
    return css_class.Id === null;
  }

  async deleteByColumnId(ColumnId: number) {
    return await this.repo.delete({ ColumnId });
  }

  async deleteByRowId(RowId: number) {
    return await this.repo.delete({ RowId });
  }
}
