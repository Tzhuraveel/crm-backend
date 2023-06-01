import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto';

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
  @Post('login')
  public async login(@Body() body: LoginDto, @Res() res): Promise<Response> {
    const tokenPair = await this.authService.login(body);

    return res.status(HttpStatus.OK).json(tokenPair);
  }
}
