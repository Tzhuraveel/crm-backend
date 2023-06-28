import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ManagementModule } from '../management';
import { OrderModule } from '../order';
import { UserModule } from '../user';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [UserModule, AuthModule, ManagementModule, OrderModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
