import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { NotFoundEntityException } from '../../core/exception';
import { EUserRole } from '../user/model/enum';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class ManagementService {
  constructor(private readonly userRepository: UserRepository) {}

  public async ban(userId: number): Promise<void> {
    const userFromDb = await this.userRepository.findOneBy({ id: userId });

    if (!userFromDb) throw new NotFoundEntityException('User');

    if (userFromDb.role === EUserRole.ADMIN)
      throw new ForbiddenException(`You don't have permissions to ban admin`);

    if (userFromDb.is_banned)
      throw new BadRequestException('User is already banned');

    await this.userRepository.update(userId, { is_banned: true });
  }

  public async unban(userId: number): Promise<void> {
    const userFromDb = await this.userRepository.findOneBy({ id: userId });

    if (!userFromDb) throw new NotFoundEntityException('User');

    if (userFromDb.role === EUserRole.ADMIN)
      throw new ForbiddenException(`You don't have permissions to unban admin`);

    if (!userFromDb.is_banned)
      throw new BadRequestException('User is already unbanned');

    await this.userRepository.update(userId, { is_banned: false });
  }
}
