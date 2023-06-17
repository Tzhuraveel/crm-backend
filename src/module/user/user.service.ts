import { Injectable } from '@nestjs/common';

import { PageService } from '../page';
import { IPageOptions, IPagePagination } from '../page/model/interface';
import { UserResponseDto } from './model/dto';
import { EUserRole } from './model/enum';
import { IUserData, IUserQueriesData } from './model/interface';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
    private readonly pageService: PageService,
  ) {}

  public async getAllWithPagination(
    pageOptions: IPageOptions,
    userData: IUserQueriesData,
  ): Promise<IPagePagination<UserResponseDto[]>> {
    const { typeSort, sortBy } = this.pageService.sortByField(pageOptions.sort);

    const convertedData = this.pageService.convertFieldsToILikePattern(
      userData.restData,
    ) as IUserData;

    const [usersFromDb, totalCount] = await this.userRepository.findManyByQuery(
      {
        typeSort,
        sortBy,
        convertedData: { ...convertedData, role: EUserRole.MANAGER },
        skip: pageOptions.skip,
        take: pageOptions.take,
      },
    );

    const users = this.userMapper.toManyResponse(usersFromDb);

    const pagination = this.pageService.returnWithPagination({
      page: pageOptions.page,
      take: pageOptions.take,
      itemCount: usersFromDb.length,
      totalCount,
    });

    return { ...pagination, data: users };
  }
}
