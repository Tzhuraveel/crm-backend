import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { RolesAccess } from '../../core/decorator/role.decorator';
import { BearerGuard } from '../../core/guard';
import { RolesGuard } from '../../core/guard/roles.guard';
import { IntTransformPipe } from '../../core/validation/pipe';
import { AuthService } from '../auth';
import { ActionTokenResponseDto, RegisterDto } from '../auth/model/dto';
import { ManagementService } from '../management';
import { OrderService } from '../order';
import { OrderStatisticsResponseDto } from '../order/model/dto';
import { IPageOptions } from '../page/model/interface';
import { UserService } from '../user';
import {
  UserQueryDto,
  UserResponseDto,
  UsersResponseDto,
} from '../user/model/dto';
import { EUserRole } from '../user/model/enum';
import { IUserQueriesData } from '../user/model/interface';

@UseGuards(BearerGuard, RolesGuard)
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly orderService: OrderService,
    private readonly managementService: ManagementService,
  ) {}
  @ApiOperation({
    description: 'Get an action token to activate the user',
    summary: 'action token',
  })
  @ApiOkResponse({ type: ActionTokenResponseDto })
  @RolesAccess(EUserRole.ADMIN)
  @Get('/activate-token/:userId')
  private async createActivateToken(
    @Res() res,
    @Param('userId', IntTransformPipe) userId: number,
  ): Promise<ActionTokenResponseDto> {
    const actionToken = await this.authService.createActivateToken(userId);

    return res.status(HttpStatus.OK).json({ actionToken });
  }

  @ApiOperation({
    description: 'Get an forgot token to recovery password',
    summary: 'action token',
  })
  @ApiOkResponse({ type: ActionTokenResponseDto })
  @RolesAccess(EUserRole.ADMIN)
  @Get('/forgot-token/:userId')
  private async createForgotToken(
    @Res() res,
    @Param('userId', IntTransformPipe) userId: number,
  ): Promise<ActionTokenResponseDto> {
    const actionToken = await this.authService.createForgotToken(userId);

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

  @ApiOperation({ description: 'Ban manager', summary: 'ban' })
  @RolesAccess(EUserRole.ADMIN)
  @ApiNoContentResponse()
  @Patch('ban-manager/:userId')
  private async ban(
    @Res() res,
    @Param('userId', IntTransformPipe) userId: number,
  ) {
    await this.managementService.ban(userId);

    return res.status(HttpStatus.NO_CONTENT).sendStatus(HttpStatus.NO_CONTENT);
  }

  @ApiOperation({ description: 'Unban manager', summary: 'Unban' })
  @RolesAccess(EUserRole.ADMIN)
  @ApiNoContentResponse()
  @Patch('unban-manager/:userId')
  private async unban(
    @Res() res,
    @Param('userId', IntTransformPipe) userId: number,
  ) {
    await this.managementService.unban(userId);

    return res.status(HttpStatus.NO_CONTENT).sendStatus(HttpStatus.NO_CONTENT);
  }

  @ApiOperation({
    description: 'Get all users with pagination',
    summary: 'get users',
  })
  @ApiQuery({ required: false, type: UserQueryDto })
  @ApiOkResponse({ type: [UsersResponseDto] })
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
    description: 'Get order statistics',
    summary: 'order statistics',
  })
  @RolesAccess(EUserRole.ADMIN)
  @ApiOkResponse({ type: OrderStatisticsResponseDto })
  @Get('/statistic/orders')
  private async orderStatistics(
    @Res() res,
  ): Promise<OrderStatisticsResponseDto> {
    const orderStatistics = await this.orderService.getOrderStatistics();

    return res.status(HttpStatus.OK).json(orderStatistics);
  }

  @ApiOperation({
    description: 'Get user statistics',
    summary: 'user statistics',
  })
  @RolesAccess(EUserRole.ADMIN)
  @ApiOkResponse({ type: OrderStatisticsResponseDto })
  @Get('/statistic/users/:userId')
  private async userStatistics(
    @Res() res,
    @Param('userId', IntTransformPipe) userId: number,
  ): Promise<OrderStatisticsResponseDto> {
    const orderStatistics = await this.orderService.getUserStatistics(userId);

    return res.status(HttpStatus.OK).json(orderStatistics);
  }
}
