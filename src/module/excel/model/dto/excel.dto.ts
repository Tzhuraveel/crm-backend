import { OmitType } from '@nestjs/swagger';

import { QueryDto } from '../../../order/model/dto';

export class ExcelDto extends OmitType(QueryDto, ['take', 'skip']) {
  get take(): undefined {
    return undefined;
  }
  get skip(): undefined {
    return undefined;
  }
}
