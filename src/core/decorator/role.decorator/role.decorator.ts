import { SetMetadata } from '@nestjs/common';

import { EUserRole } from '../../../module/user/model/enum';

export const RolesAccess = (...roles: EUserRole[]) =>
  SetMetadata('roles', roles);
