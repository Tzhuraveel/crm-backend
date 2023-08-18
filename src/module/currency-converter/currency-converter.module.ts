import { Module } from '@nestjs/common';

import { CurrencyConverterService } from './currency-converter.service';

@Module({
  providers: [CurrencyConverterService],
  exports: [CurrencyConverterService],
})
export class CurrencyConverterModule {}
