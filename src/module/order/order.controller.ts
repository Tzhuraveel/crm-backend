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
import { BearerGuard } from '../../core/guard/bearer.guard';
import { IPaginationPage } from '../../core/interface';
import { OrderDto, OrderResponseDto, QueryDto } from './model/dto';
import { OrderService } from './order.service';

@ApiTags('orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(BearerGuard)
  @Get()
  @ApiOperation({
    description:
      'Get all orders. You can include additional filter criteria based on your specific requirements, such as age, email, etc.',
    summary: 'filter',
  })
  @ApiOkResponse({ type: [OrderResponseDto] })
  private async getAllByQuery(
    @Res() res,
    @Query() pageParameters: QueryDto,
  ): Promise<IPaginationPage<Orders[]>> {
    const orders = await this.orderService.getAllByQuery(pageParameters);

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
  ): Promise<IPaginationPage<Orders[]>> {
    await this.orderService.update(body, req.user, orderId);

    return res.status(HttpStatus.OK).sendStatus(HttpStatus.OK);
  }
}
