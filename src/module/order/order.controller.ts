import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { Orders } from '../../core/database/entities';
import { BearerGuard } from '../../core/guard';
import { IPageOptions, IPagePagination } from '../page/model/interface';
import { UserResponseDto } from '../user/model/dto';
import { OrdersResponseDto, OrderUpdateDto, QueryDto } from './model/dto';
import { IOrderQueriesData } from './model/interface';
import { OrderService } from './order.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(BearerGuard)
  @ApiOperation({
    description:
      'Get all orders. You can include additional filter criteria based on your specific requirements, such as age, email, etc.',
    summary: 'filter',
  })
  @ApiOkResponse({ type: [OrdersResponseDto] })
  @Get()
  private async getAllByQuery(
    @Req() req,
    @Res() res,
    @Query() pageOptions: QueryDto,
  ): Promise<IPagePagination<UserResponseDto[]>> {
    const {
      page,
      take,
      skip,
      sort,
      id,
      manager,
      start_course,
      end_course,
      ...restData
    } = pageOptions;
    const pageData = { page, take, skip, sort } as IPageOptions;
    const orderData = {
      id,
      manager,
      start_course,
      end_course,
      restData,
    } as IOrderQueriesData;

    const orders = await this.orderService.getAllWithPagination(
      pageData,
      orderData,
      req.user,
    );

    return res.status(HttpStatus.OK).json(orders);
  }

  @UseGuards(BearerGuard)
  @ApiOperation({
    description:
      'Update order. Only the manager processing this order can change the order details',
    summary: 'update order',
  })
  @ApiQuery({
    required: true,
    name: 'orderId',
    description: 'The id of the order to be changed',
  })
  @ApiOkResponse({ type: OrdersResponseDto })
  @ApiBody({ type: OrderUpdateDto })
  @Patch(':orderId')
  private async update(
    @Res() res,
    @Req() req,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body()
    body: OrderUpdateDto,
  ): Promise<IPagePagination<Orders>> {
    if (Object.values(body).length === 0) {
      throw new BadRequestException('Not provider data to update the order');
    }

    const orders = await this.orderService.update(body, req.user, +orderId);

    return res.status(HttpStatus.OK).json(orders);
  }
}
