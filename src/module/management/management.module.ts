import { Module } from '@nestjs/common';

import { UserRepository } from '../user/user.repository';
import { ManagementService } from './management.service';

@Module({
  providers: [ManagementService, UserRepository],
  exports: [ManagementService],
})
export class ManagementModule {}
