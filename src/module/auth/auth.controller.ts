import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { User } from '../../core/database/entities';
import { BearerGuard } from '../../core/guard';
import { ITokenPair } from '../token/model/interface';
import { UserResponseDto } from '../user/model/dto';
import { AuthService } from './auth.service';
import {
  AccessResponseDto,
  LoginDto,
  PasswordDto,
  TokenResponseDto,
} from './model/dto';

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
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AccessResponseDto })
  @Post('login')
  public async login(
    @Body() body: LoginDto,
    @Res() res,
  ): Promise<AccessResponseDto> {
    const tokenPair: AccessResponseDto = await this.authService.login(body);

    return res.status(HttpStatus.OK).json(tokenPair);
  }

  @ApiOperation({
    description:
      'Refresh token. You should send the bearer token. If token did' +
      ' not expire, you' +
      ' will get new refresh and access tokens',
    summary: 'Refresh',
  })
  @ApiOkResponse({ type: TokenResponseDto })
  @Get('refresh')
  public async getRefreshToken(
    @Req() req,
    @Res() res,
  ): Promise<TokenResponseDto> {
    const bearerToken = req.headers.authorization;

    if (!bearerToken && !bearerToken?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid Bearer Token');
    }
    const tokenPair: ITokenPair = await this.authService.getRefreshToken(
      bearerToken.replace('Bearer ', ''),
    );

    return res.status(HttpStatus.OK).json(tokenPair);
  }

  @ApiOperation({
    description: 'Get authenticated user',
    summary: 'me',
  })
  @ApiOkResponse({ type: UserResponseDto })
  @UseGuards(BearerGuard)
  @Get('me')
  public async getAuthorizedUser(@Req() req, @Res() res): Promise<User> {
    return res
      .status(HttpStatus.OK)
      .json(this.authService.userFromMapper(req.user));
  }

  @ApiOperation({
    description: 'Activate the user with an action token',
    summary: 'activate user',
  })
  @ApiBody({ required: true, type: PasswordDto })
  @ApiOkResponse({ type: UserResponseDto })
  @Post('/activate/:token')
  private async activateUser(
    @Res() res,
    @Body() body: PasswordDto,
    @Param('token') token: string,
  ): Promise<UserResponseDto> {
    const createdUser: UserResponseDto = await this.authService.activateUser(
      token,
      body,
    );

    return res.status(HttpStatus.CREATED).json(createdUser);
  }

  @ApiOperation({
    description: 'Recovery password with an action token',
    summary: 'recovery password',
  })
  @ApiBody({ required: true, type: PasswordDto })
  @ApiNoContentResponse()
  @Post('/recovery-password/:token')
  private async recoveryPassword(
    @Res() res,
    @Param('token') token: string,
    @Body() body: PasswordDto,
  ): Promise<UserResponseDto> {
    await this.authService.recoveryPassword(token, body);

    return res.status(HttpStatus.NO_CONTENT).sendStatus(HttpStatus.NO_CONTENT);
  }
}
