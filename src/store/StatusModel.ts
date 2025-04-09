import { makeAutoObservable } from 'mobx';

export enum Status {
  LOADED,
  STARTED,
  CANCELED,
  NOT_STARTED,
}

export interface IStatusModel {
  status: Status;
  isLoading: boolean;

  start: () => void;
  finish: () => void;
  cancel: () => void;
}

export class StatusModel implements IStatusModel {
  status = Status.NOT_STARTED;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this.status === Status.STARTED;
  }

  start() {
    this.status = Status.STARTED;
  }

  finish() {
    this.status = Status.LOADED;
  }

  cancel() {
    this.status = Status.CANCELED;
  }
}
