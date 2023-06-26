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
import { PageMapper } from '../page/page.mapper';
import { ExcelService } from './excel.service';
import { ExcelDto } from './model/dto/excel.dto';

@UseGuards(BearerGuard)
@ApiTags('excel')
@Controller('excel')
export class ExcelController {
  constructor(
    private readonly excelService: ExcelService,
    private readonly pageMapper: PageMapper,
  ) {}

  @ApiOperation({
    description: 'Get a table with orders in .xlsx extension',
    summary: 'excel file',
  })
  @ApiOkResponse()
  @Header('Content-Type', 'text/xlsx')
  @Get('users')
  async download(@Req() req, @Res() res, @Query() pageOptions: ExcelDto) {
    const { pageData, orderData } = this.pageMapper.toRequestQuery(pageOptions);

    const result = await this.excelService.downloadExcel(
      pageData,
      orderData,
      req.user,
    );
    return res.download(result);
  }
}
