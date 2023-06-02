import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BearerGuard } from '../../core/guard/bearer.guard';
import { OrderResponseDto, QueryDto } from './dto';
import { OrderService } from './order.service';

@ApiTags('order')
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
  private async getAllByQuery(@Res() res, @Query() pageParameters: QueryDto) {
    console.log(pageParameters);
    const orders = await this.orderService.getAllByQuery(pageParameters);

    return res.status(HttpStatus.OK).json(orders);
  }
}
