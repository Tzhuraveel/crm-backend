import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { User } from '../../core/database/entities';
import { BearerGuard } from '../../core/guard';
import { UserResponseDto } from '../user/model/dto';
import { AuthService } from './auth.service';
import { AccessResponseDto, LoginDto, RefreshResponseDto } from './model/dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    description:
      'Takes a set of user credentials and returns access and refresh JSON web\n' +
      'token to prove the authentication of those credentials.',
    summary: 'Login user',
  })
  @ApiBody({ type: LoginDto, required: true })
  @ApiOkResponse({ type: AccessResponseDto })
  @Post('login')
  public async login(
    @Body() body: LoginDto,
    @Res() res,
  ): Promise<AccessResponseDto> {
    const tokenPair = await this.authService.login(body);

    return res.status(HttpStatus.OK).json(tokenPair);
  }

  @ApiOperation({
    description:
      'Refresh token. You should send the bearer token. If token did' +
      ' not expire, you' +
      ' will get new refresh and access tokens',
    summary: 'Refresh',
  })
  @ApiOkResponse({ type: RefreshResponseDto })
  @Get('refresh')
  public async refresh(@Req() req, @Res() res): Promise<RefreshResponseDto> {
    const bearerToken = req.headers.authorization;

    if (!bearerToken && !bearerToken?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid Bearer Token');
    }
    const tokenPair = await this.authService.refresh(
      bearerToken.replace('Bearer ', ''),
    );

    return res.status(HttpStatus.OK).json(tokenPair);
  }

  @UseGuards(BearerGuard)
  @ApiOperation({
    description: 'Get authenticated user',
    summary: 'me',
  })
  @ApiOkResponse({ type: UserResponseDto })
  @Get('me')
  public async findUser(@Req() req, @Res() res): Promise<User> {
    return res
      .status(HttpStatus.OK)
      .json(this.authService.userFromMapper(req.user));
  }
}
