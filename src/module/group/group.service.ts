import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Group } from '../../core/database/entities';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  public async getAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  public async addGroup(name: string) {
    const groupFromDb = await this.groupRepository.findByGroupName(name);

    if (groupFromDb) {
      throw new HttpException('Group already exist', HttpStatus.BAD_REQUEST);
    }

    await this.groupRepository.save({ name });
  }

  public async delete(id: number) {
    const groupFromDb = await this.groupRepository.findOne({ where: { id } });

    if (!groupFromDb) {
      throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
    }

    await this.groupRepository.delete(id);
  }
}
