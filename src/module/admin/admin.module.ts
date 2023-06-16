import { Module } from '@nestjs/common';

import { AuthModule } from '../auth';
import { UserModule } from '../user';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [UserModule, AuthModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
