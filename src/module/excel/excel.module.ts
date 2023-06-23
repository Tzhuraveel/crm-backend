import { Module } from '@nestjs/common';

import { OrderModule } from '../order';
import { OrderMapper } from '../order/order.mapper';
import { PageMapper } from '../page/page.mapper';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';

@Module({
  imports: [OrderModule],
  providers: [ExcelService, OrderMapper, PageMapper],
  exports: [ExcelService],
  controllers: [ExcelController],
})
export class ExcelModule {}
