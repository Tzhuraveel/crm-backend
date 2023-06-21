import {
  Controller,
  Get,
  Header,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BearerGuard } from '../../core/guard';
import { QueryDto } from '../order/model/dto';
import { IOrderQueriesData } from '../order/model/interface';
import { IPageOptions } from '../page/model/interface';
import { ExcelService } from './excel.service';

UseGuards(BearerGuard);
@ApiTags('excel')
@Controller('excel')
export class ExcelController {
  constructor(private excelService: ExcelService) {}

  @ApiOperation({
    description: 'Get a table with orders in .xlsx extension',
    summary: 'excel file',
  })
  @ApiOkResponse()
  @Header('Content-Type', 'text/xlsx')
  @Get('users')
  async download(@Req() req, @Res() res, @Query() pageOptions: QueryDto) {
    const {
      page,
      take,
      skip,
      sort,
      id,
      manager,
      start_course,
      end_course,
      ...restData
    } = pageOptions;
    const pageData = { page, take, skip, sort } as IPageOptions;
    const orderData = {
      id,
      manager,
      start_course,
      end_course,
      restData,
    } as IOrderQueriesData;
    const result = await this.excelService.downloadExcel(
      pageData,
      orderData,
      req.user,
    );
    return res.download(result);
  }
}
