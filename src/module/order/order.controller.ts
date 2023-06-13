import {
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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Orders } from '../../core/database/entities';
import { BearerGuard } from '../../core/guard';
import { OrderDto, OrderResponseDto, QueryDto } from './model/dto';
import { IPaginationPage } from './model/interface/page.interface';
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
  @ApiOkResponse({ type: [OrderResponseDto] })
  @Get()
  private async getAllByQuery(
    @Req() req,
    @Res() res,
    @Query() queries: QueryDto,
  ): Promise<IPaginationPage<Orders[]>> {
    const orders = await this.orderService.getAllByQuery(queries, req.user);

    return res.status(HttpStatus.OK).json(orders);
  }

  @UseGuards(BearerGuard)
  @ApiOperation({
    description:
      'Update order. Only the manager processing this order can change the order details',
    summary: 'update order',
  })
  @ApiParam({
    required: true,
    name: 'orderId',
    description: 'The id of the order to be changed',
  })
  @Patch(':orderId')
  private async update(
    @Res() res,
    @Req() req,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body()
    body: OrderDto,
  ): Promise<IPaginationPage<Orders>> {
    const orders = await this.orderService.update(body, req.user, orderId);

    return res.status(HttpStatus.OK).json(orders);
  }
}
