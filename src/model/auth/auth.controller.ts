import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('createUser')
  private async create(@Body() body, @Res() res) {
    await this.authService.create(body);

    return res.json().status(HttpStatus.CREATED);
  }
}
