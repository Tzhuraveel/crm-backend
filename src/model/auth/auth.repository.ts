import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../core/database/entities';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
  ) {}

  public async create(body) {
    await this.authRepository.save(body);
  }
}
