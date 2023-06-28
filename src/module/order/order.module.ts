import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { GroupModule } from '../group';
import { PageModule } from '../page';
import { OrderController } from './order.controller';
import { OrderMapper } from './order.mapper';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [forwardRef(() => AuthModule), GroupModule, PageModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderMapper],
  exports: [OrderService, OrderRepository, OrderMapper],
})
export class OrderModule {}
