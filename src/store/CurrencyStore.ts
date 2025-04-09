import { makeAutoObservable } from 'mobx';
import { StatusModel } from './StatusModel';


export class CurrencyStore {
  public amount = '';
  public id = null as number | null;
  public status = new StatusModel();

  constructor() {
    makeAutoObservable(this);
  }

  setAmount(value: string) {
    this.amount = value;
  }

  setId(value: number) {
    this.id = value;
  }
}
