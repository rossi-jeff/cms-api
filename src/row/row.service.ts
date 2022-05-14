import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageRow } from './row.entity';
import {
  CreateRowDto,
  CreateColumnDbDto,
  CreateColumnDto,
  CreateCssClassDbDto,
  CreateCssClassDto,
  SortDto
} from '../global/dto';
import * as _ from 'lodash';
import { ColumnService } from '../column/column.service';
import { CssClassService } from '../css-class/css-class.service';

@Injectable()
export class RowService {
  constructor(
    @InjectRepository(PageRow) private repo: Repository<PageRow>,
    private columnService: ColumnService,
    private cssClassService: CssClassService,
  ) {}

  async getRows(PageId: number) {
    return await this.repo.find({
      where: { PageId },
      relations: ['CssClasses', 'Columns', 'Columns.CssClasses'],
    });
  }

  async createRow(DTO: CreateRowDto, PageId: number) {
    const row = new PageRow();
    _.merge(row, DTO);
    row.PageId = PageId;
    return await this.repo.save(row);
  }

  async showRow(
    UUID: string,
    relations: string[] = ['CssClasses', 'Columns', 'Columns.CssClasses'],
  ) {
    const row = await this.repo.findOne({ where: { UUID } });
    if (!row) {
      throw new NotFoundException(`No row found with UUID ${UUID}`);
    }
    return row;
  }

  async updateRow(UUID: string, DTO: CreateRowDto) {
    const row = await this.showRow(UUID, []);
    _.merge(row, DTO);
    await this.repo.save(row);
    return await this.showRow(UUID);
  }

  async deleteRow(UUID: string) {
    const row = await this.showRow(UUID);
    await this.cssClassService.deleteByRowId(row.Id);
    await this.columnService.deleteByRowId(row.Id);
    await this.repo.remove(row);
    return row.Id === null;
  }

  async getColumns(UUID: string) {
    const row = await this.showRow(UUID);
    return await this.columnService.getColumns(row.Id);
  }

  async createColumn(UUID: string, DTO: CreateColumnDto) {
    const row = await this.showRow(UUID);
    const RowId = row.Id;
    const { Order, Content } = DTO;
    const createDTO: CreateColumnDbDto = {
      Order,
      Content,
      RowId,
    };
    return await this.columnService.createColumn(createDTO);
  }

  async getRowClasses(UUID: string) {
    const row = await this.showRow(UUID);
    return await this.cssClassService.getRowClasses(row.Id);
  }

  async createCssClass(UUID: string, DTO: CreateCssClassDto) {
    const row = await this.showRow(UUID);
    const RowId = row.Id;
    const { Name, Order } = DTO;
    const createDTO: CreateCssClassDbDto = {
      Name,
      Order,
      RowId,
    };
    return await this.cssClassService.createCssClass(createDTO);
  }

  async sortRows(DTO: SortDto) {
    const { Sorted } = DTO;
    let Order = 0;
    for (let Id of Sorted) {
      await this.repo.update({ Id }, { Order });
      Order++;
    }
  }
}
