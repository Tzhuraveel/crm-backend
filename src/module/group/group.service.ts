import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

import { Group } from '../../core/database/entities';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  public async getAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  public async addGroup(name: string): Promise<Group> {
    const groupFromDb = await this.groupRepository.findByGroupName(name);

    if (groupFromDb)
      throw new HttpException('Group already exist', HttpStatus.BAD_REQUEST);

    return await this.groupRepository.save({ name });
  }

  public async delete(id: number) {
    const groupFromDb = await this.groupRepository.findOne({
      where: { id },
    });

    if (!groupFromDb) throw new NotFoundError('Group not found');

    await this.groupRepository.delete(id);
  }
}
