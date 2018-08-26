import { Action } from '@ngrx/store';

export enum UtilActionTypes {
  Noop = '[Noop] Noop',
}

export class Noop implements Action {
  readonly type = UtilActionTypes.Noop;
  constructor(payload: null = null){}
}

export type UtilActions = Noop;