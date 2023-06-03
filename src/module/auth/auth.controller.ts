import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto, TokenResponseDto } from './models/dto';

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
  @ApiOkResponse({ type: TokenResponseDto })
  @Post('login')
  public async login(
    @Body() body: LoginDto,
    @Res() res,
  ): Promise<TokenResponseDto> {
    const tokenPair = await this.authService.login(body);

    return res.status(HttpStatus.OK).json(tokenPair);
  }

  @ApiOperation({
    description:
      'Refresh token. you should send the token in the "header" in the "authorization" field. If refresh token did' +
      ' not expire, you' +
      ' will get new refresh and access tokens',
    summary: 'Refresh',
  })
  @ApiOkResponse({ type: TokenResponseDto })
  @Get('refresh')
  public async refresh(@Req() req, @Res() res): Promise<TokenResponseDto> {
    const { authorization } = req.headers;

    const tokenPair = await this.authService.refresh(authorization);

    return res.status(HttpStatus.OK).json(tokenPair);
  }
}
