import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BearerGuard } from '../../core/guard';
import { RolesGuard } from '../../core/guard/roles.guard';

@ApiTags('users')
@UseGuards(BearerGuard, RolesGuard)
@Controller('users')
export class UserController {}
