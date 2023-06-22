import { Module } from '@nestjs/common';

import { AuthModule } from '../auth';
import { GroupRepository } from '../group/group.repository';
import { PageService } from '../page';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [AuthModule],
  controllers: [OrderController],
  providers: [PageService, OrderService, OrderRepository, GroupRepository],
  exports: [OrderService],
})
export class OrderModule {}
