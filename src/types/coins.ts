import { IOption } from './common.ts';

export interface ICoin {
  id: number;
  name: string;
  symbol: string;
}

export interface ICoinOption extends IOption {
  name: string;
}
