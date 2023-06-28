import { Module } from '@nestjs/common';

import { OrderModule } from '../order';
import { PageModule } from '../page';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';

@Module({
  imports: [OrderModule, PageModule, OrderModule],
  providers: [ExcelService],
  exports: [ExcelService],
  controllers: [ExcelController],
})
export class ExcelModule {}
