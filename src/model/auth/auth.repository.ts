import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../core/database/entities';
import { EDbField } from '../../core/enum/dynamic.enum';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
  ) {}

  public async create(body) {
    await this.authRepository.save(body);
  }

  public async findByUniqueField(field: string, dbField: EDbField) {
    return this.authRepository.findOne({ where: { [dbField]: field } });
  }
}
