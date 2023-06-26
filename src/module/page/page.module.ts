import { Module } from '@nestjs/common';

import { PageMapper } from './page.mapper';
import { PageService } from './page.service';

@Module({
  providers: [PageMapper, PageService],
  exports: [PageMapper, PageService],
})
export class PageModule {}
