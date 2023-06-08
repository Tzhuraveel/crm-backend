import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Group } from '../../core/database/entities';
import { BearerGuard } from '../../core/guard';
import { GroupService } from './group.service';
import { GroupDto, GroupResponseDto } from './model/dto/group.dto';

@UseGuards(BearerGuard)
@ApiTags('groups')
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @ApiOperation({
    description: 'Get all existing groups',
    summary: 'get all group',
  })
  @ApiOkResponse({ type: [GroupDto] })
  @Get()
  private async getAll(@Res() res): Promise<Group[]> {
    return res.status(HttpStatus.OK).json(await this.groupService.getAll());
  }

  @ApiBody({ type: GroupDto, required: true })
  @ApiOperation({ description: 'add a new group', summary: 'group' })
  @ApiCreatedResponse({ type: GroupResponseDto })
  @Post()
  private async addGroup(@Res() res, @Body() body: GroupDto): Promise<Group> {
    const createdGroup = await this.groupService.addGroup(body.name);

    return res.status(HttpStatus.CREATED).json(createdGroup);
  }

  @ApiOperation({
    description: 'deletion a group',
    summary: 'deletion a group',
  })
  @ApiParam({
    required: true,
    name: 'groupId',
    description: 'Group id is required to delete the group',
  })
  @ApiCreatedResponse()
  @Delete(':groupId')
  private async delete(
    @Res() res,
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    await this.groupService.delete(groupId);

    return res.status(HttpStatus.NO_CONTENT).sendStatus(HttpStatus.NO_CONTENT);
  }
}
