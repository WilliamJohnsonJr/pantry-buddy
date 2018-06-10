import { Action } from '@ngrx/store';

export enum BaseActionTypes {
    AlreadyLoaded = '[Base] Already Loaded - NOOP',
}

export class AlreadyLoaded implements Action {
  readonly type = BaseActionTypes.AlreadyLoaded;

  constructor(public payload = null) {}
}

export type BaseActions =
 AlreadyLoaded