import { CoinStore } from "./CoinStore";
import { ExchangeStore } from "./ExchangeStore";


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
