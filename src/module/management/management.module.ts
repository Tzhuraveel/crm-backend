import { Module } from '@nestjs/common';

import { UserModule } from '../user';
import { ManagementService } from './management.service';

@Module({
  imports: [UserModule],
  providers: [ManagementService],
  exports: [ManagementService],
})
export class ManagementModule {}
