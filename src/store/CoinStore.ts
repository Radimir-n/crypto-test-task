import { makeAutoObservable } from 'mobx';
import { ICoin, ICoinOption } from '../types/coins.ts';

export class CoinStore {
  public coins = [] as ICoin[];

  constructor() {
    makeAutoObservable(this);
  }

  get coinsOptions(): ICoinOption[] {
    return this.coins.map(
      (coin) => ({ value: coin.id, label: coin.symbol, name: coin.name }) as ICoinOption,
    );
  }

  setCoins(value: ICoin[]) {
    this.coins = value;
  }
}
