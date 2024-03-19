import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LessThan } from 'typeorm';

import { AuthConfigService } from '../../../config/auth';
import { ActionToken } from '../../../core/database/entities';
import { EActionToken } from '../model/enum';
import { ITokenPayload } from '../model/interface';
import { ActionTokenRepository } from './action-token.repository';

@Injectable()
export class ActionTokenService {
  constructor(
    private readonly actionTokenRepository: ActionTokenRepository,
    private readonly jwtService: JwtService,
    private readonly authConfigService: AuthConfigService,
  ) {}

  public async verifyActionToken(
    token: string,
    typeToken: EActionToken,
  ): Promise<ITokenPayload> {
    let secret: string;

    switch (typeToken) {
      case EActionToken.ACTIVATE:
        secret = this.authConfigService.activateSecretToken;
        break;
      case EActionToken.FORGOT:
        secret = this.authConfigService.forgotSecretToken;
        break;
    }

    const payload: ITokenPayload = (await this.jwtService.verifyAsync(token, {
      secret,
    })) as ITokenPayload;

    if (!payload)
      throw new HttpException('Token not valid', HttpStatus.BAD_REQUEST);

    return payload;
  }
  public async findByActionToken(
    token: string,
    typeToken: EActionToken,
  ): Promise<ActionToken> {
    const actionTokenFromDb = await this.actionTokenRepository.findOne({
      where: { actionToken: token, typeToken },
    });

    if (!actionTokenFromDb) {
      throw new NotFoundException('Token deleted or expired');
    }

    return actionTokenFromDb;
  }

  public async deleteManyActionTokenByDate(createdAt: Date): Promise<void> {
    await this.actionTokenRepository.delete({
      created_at: LessThan(createdAt),
    });
  }

  public async deleteActionToken(actionToken: string) {
    await this.actionTokenRepository.delete({ actionToken });
  }

  public async getActivateToken(payload: ITokenPayload): Promise<string> {
    const activateToken = await this.jwtService.signAsync(payload, {
      secret: this.authConfigService.activateSecretToken,
      expiresIn: this.authConfigService.activateSecretTokenExpiration,
    });

    await this.actionTokenRepository.save({
      typeToken: EActionToken.ACTIVATE,
      userId: payload.userId,
      actionToken: activateToken,
    });

    return activateToken;
  }

  public async getForgotToken(payload: ITokenPayload): Promise<string> {
    const forgotToken = await this.jwtService.signAsync(payload, {
      secret: this.authConfigService.forgotSecretToken,
      expiresIn: this.authConfigService.forgotSecretTokenExpiration,
    });

    await this.actionTokenRepository.save({
      typeToken: EActionToken.FORGOT,
      userId: payload.userId,
      actionToken: forgotToken,
    });

    return forgotToken;
  }
}
