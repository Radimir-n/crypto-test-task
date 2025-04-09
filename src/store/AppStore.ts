import { ExchangeStore } from './ExchangeStore.ts';
import { CoinStore } from './CoinStore.ts';

export interface IAppStore {
  coinStore: CoinStore;
  exchangeStore: ExchangeStore;
}

export class AppStore implements IAppStore {
  public coinStore;
  public exchangeStore;

  constructor() {
    this.coinStore = new CoinStore();
    this.exchangeStore = new ExchangeStore();
  }
}
