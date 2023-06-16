import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

import { RolesAccess } from '../../core/decorator/role.decorator';
import { BearerGuard } from '../../core/guard';
import { RolesGuard } from '../../core/guard/roles.guard';
import { AuthService } from '../auth/auth.service';
import { ActionTokenResponseDto, RegisterDto } from '../auth/model/dto';
import { IPageOptions } from '../page/model/interface';
import {
  UserQueryDto,
  UserResponseDto,
  UsersResponseDto,
} from '../user/model/dto';
import { EUserRole } from '../user/model/enum';
import { IUserQueriesData } from '../user/model/interface';
import { UserService } from '../user/user.service';

@UseGuards(BearerGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @ApiOperation({
    description: 'Get all users with pagination',
    summary: 'get users',
  })
  @ApiQuery({ required: false, type: UserQueryDto })
  @ApiOkResponse({ type: UsersResponseDto })
  @RolesAccess(EUserRole.ADMIN)
  @Get('all-managers')
  private async getAll(@Res() res, @Query() pageOptions: UserQueryDto) {
    const { take, page, skip, start_login, end_login, sort, ...restData } =
      pageOptions;

    const pageData = { take, page, skip, sort } as IPageOptions;
    const userData = { start_login, end_login, restData } as IUserQueriesData;

    const users = await this.userService.getAllWithPagination(
      pageData,
      userData,
    );

    return res.status(HttpStatus.OK).json(users);
  }

  @ApiOperation({
    description: 'Get an action token to activate the user',
    summary: 'action token',
  })
  @ApiBody({ required: true, type: RegisterDto })
  @ApiOkResponse({ type: ActionTokenResponseDto })
  @RolesAccess(EUserRole.ADMIN)
  @Get('/activate-token/:userId')
  private async createActivateToken(
    @Res() res,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ActionTokenResponseDto> {
    const actionToken = await this.authService.createActivateToken(userId);

    return res.status(HttpStatus.OK).json({ actionToken });
  }

  @ApiBody({ required: true, type: RegisterDto })
  @ApiOperation({ description: 'register manager' })
  @ApiCreatedResponse({ type: UserResponseDto })
  @RolesAccess(EUserRole.ADMIN)
  @Post('register-manager')
  private async create(
    @Res() res,
    @Body() body: RegisterDto,
  ): Promise<UserResponseDto> {
    const createdUser = await this.authService.register(body);

    return res.status(HttpStatus.CREATED).json(createdUser);
  }
}
