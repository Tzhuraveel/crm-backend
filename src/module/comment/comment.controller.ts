import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { BearerGuard } from '../../core/guard/bearer.guard';
import { CommentService } from './comment.service';
import { CommentDto, CommentResponseDto } from './model/dto';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(BearerGuard)
  @Post(':orderId')
  @ApiParam({
    required: true,
    name: 'orderId',
    description: 'order id is required to add a comment to this order',
  })
  @ApiOperation({
    description:
      'Adding a comment. You can write a comment only where there is no manager. In addition, only the manager who handles this order can write comments ',
    summary: 'add a comment',
  })
  @ApiCreatedResponse({ type: CommentResponseDto })
  private async add(
    @Res() res,
    @Req() req,
    @Body() body: CommentDto,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    const comment = await this.commentService.add(
      body.comment,
      orderId,
      req.user,
    );

    return res.status(HttpStatus.CREATED).json(comment);
  }

  @UseGuards(BearerGuard)
  @ApiOperation({
    description: 'Deletion a comment. You can delete only your comments',
    summary: 'delete a comment',
  })
  @ApiParam({
    required: true,
    name: 'commentId',
    description: 'comment id is required to delete',
  })
  @ApiNoContentResponse()
  @Delete(':commentId')
  private async delete(
    @Res() res,
    @Req() req,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    await this.commentService.delete(commentId, req.user);

    return res.status(HttpStatus.NO_CONTENT).sendStatus(HttpStatus.NO_CONTENT);
  }
}
