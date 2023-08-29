import { Injectable } from '@nestjs/common';

import { NotFoundEntityException } from '../../core/exception';
import { ICurrency } from './model/interface';

@Injectable()
export class CurrencyConverterService {
  constructor() {}

  public async convertMoneyToCurrency(
    sum: string,
    neededCurrency: 'EUR' | 'USD' = 'USD',
  ): Promise<number> {
    const currencyFromAPI = await this.getCurrencyPrice<ICurrency[]>();

    const chosenCurrency = currencyFromAPI.find(
      (currency) => currency.ccy === neededCurrency,
    );

    if (!chosenCurrency) throw new NotFoundEntityException('Currency');

    return +(+sum / +chosenCurrency.buy).toFixed(2);
  }

  public async getCurrencyPrice<T>(): Promise<T> {
    return await fetch(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
    ).then((response) => response.json());
  }
}
