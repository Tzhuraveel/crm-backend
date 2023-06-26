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
import { IOrderStatistics } from '../order/model/interface';
import { IPageOptions, IPagePagination } from '../page/model/interface';
import { UserService } from '../user';
import {
  UserQueryDto,
  UserResponseDto,
  UsersResponseDto,
  UserStatisticsResponseDto,
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
  private async getActivateToken(
    @Res() res,
    @Param('userId', IntTransformPipe) userId: number,
  ): Promise<ActionTokenResponseDto> {
    const actionToken = await this.authService.getActivateToken(userId);

    return res.status(HttpStatus.OK).json({ actionToken });
  }

  @ApiOperation({
    description: 'Get an forgot token to recovery password',
    summary: 'action token',
  })
  @ApiOkResponse({ type: ActionTokenResponseDto })
  @RolesAccess(EUserRole.ADMIN)
  @Get('/forgot-token/:userId')
  private async getForgotToken(
    @Res() res,
    @Param('userId', IntTransformPipe) userId: number,
  ): Promise<ActionTokenResponseDto> {
    const actionToken = await this.authService.getForgotToken(userId);

    return res.status(HttpStatus.OK).json({ actionToken });
  }

  @RolesAccess(EUserRole.ADMIN)
  @ApiBody({ required: true, type: RegisterDto })
  @ApiOperation({ description: 'register manager' })
  @ApiCreatedResponse({ type: UserResponseDto })
  @Post('register-manager')
  private async createManager(
    @Res() res,
    @Body() body: RegisterDto,
  ): Promise<UserResponseDto> {
    const createdUser = await this.authService.createManager(body);

    return res.status(HttpStatus.CREATED).json(createdUser);
  }

  @RolesAccess(EUserRole.ADMIN)
  @ApiOperation({ description: 'Ban manager', summary: 'ban' })
  @ApiNoContentResponse()
  @Patch('ban-manager/:userId')
  private async banManager(
    @Res() res,
    @Param('userId', IntTransformPipe) userId: number,
  ) {
    await this.managementService.banManager(userId);

    return res.status(HttpStatus.NO_CONTENT).sendStatus(HttpStatus.NO_CONTENT);
  }

  @ApiOperation({ description: 'Unban manager', summary: 'Unban' })
  @RolesAccess(EUserRole.ADMIN)
  @ApiNoContentResponse()
  @Patch('unban-manager/:userId')
  private async unbanManager(
    @Res() res,
    @Param('userId', IntTransformPipe) userId: number,
  ) {
    await this.managementService.unbanManager(userId);

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
  private async getAllManagers(
    @Res() res,
    @Query() pageQueries: UserQueryDto,
  ): Promise<IPagePagination<UserStatisticsResponseDto[]>> {
    const { take, page, skip, start_login, end_login, sort, ...restData } =
      pageQueries;

    const pageOptions: IPageOptions = {
      take,
      page,
      skip,
      sort,
    } as IPageOptions;
    const userData: IUserQueriesData = {
      start_login,
      end_login,
      restData,
    } as IUserQueriesData;

    const users: IPagePagination<UserStatisticsResponseDto[]> =
      await this.userService.getAllManagersWithPagination(
        pageOptions,
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
  private async getOrderStatistics(
    @Res() res,
  ): Promise<OrderStatisticsResponseDto> {
    const orderStatistics: IOrderStatistics =
      await this.orderService.getOrderStatistics();

    return res.status(HttpStatus.OK).json(orderStatistics);
  }
}
