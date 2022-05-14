import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageColumn } from './column.entity';
import {
  CreateColumnDbDto,
  CreateColumnDto,
  CreateCssClassDbDto,
  CreateCssClassDto,
  SortDto
} from '../global/dto';
import * as _ from 'lodash';
import { CssClassService } from '../css-class/css-class.service';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(PageColumn) private repo: Repository<PageColumn>,
    private cssClassService: CssClassService,
  ) {}

  async getColumns(RowId: number) {
    return await this.repo.find({
      where: { RowId },
      order: { Order: 'ASC' },
      relations: ['CssClasses'],
    });
  }

  async createColumn(DTO: CreateColumnDbDto) {
    const column = new PageColumn();
    _.merge(column, DTO);
    return await this.repo.save(column);
  }

  async showColumn(UUID: string, relations: string[] = ['CssClasses']) {
    const column = await this.repo.findOne({ where: { UUID }, relations });
    if (!column) {
      throw new NotFoundException(`No column found with UUID ${UUID}`);
    }
    return column;
  }

  async updateColumn(UUID: string, DTO: CreateColumnDto) {
    const column = await this.showColumn(UUID, []);
    _.merge(column, DTO);
    await this.repo.save(column);
    return this.showColumn(UUID);
  }

  async deleteColumn(UUID: string) {
    const column = await this.showColumn(UUID, []);
		await this.cssClassService.deleteByColumnId(column.Id);
    await this.repo.remove(column);
    return column.Id === null;
  }

  async getColumnClasses(UUID: string) {
    const column = await this.showColumn(UUID, []);
    return await this.cssClassService.getColumnClasses(column.Id);
  }

  async createCssClass(UUID: string, DTO: CreateCssClassDto) {
    const column = await this.showColumn(UUID, []);
    const ColumnId = column.Id;
    const { Name, Order } = DTO;
    const createDTO: CreateCssClassDbDto = {
      Name,
      Order,
      ColumnId,
    };
    return await this.cssClassService.createCssClass(createDTO);
  }

  async deleteByRowId(RowId: number) {
    const columns = await this.repo.find({ where: { RowId } });
    for (let column of columns) {
      await this.cssClassService.deleteByColumnId(column.Id);
      await this.repo.remove(column);
    }
  }

  async sortColumns(DTO: SortDto) {
    const { Sorted } = DTO;
    let Order = 0;
    for (let Id of Sorted) {
      await this.repo.update({ Id }, { Order });
      Order++;
    }
  }
}
