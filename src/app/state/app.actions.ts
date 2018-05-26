import { Action } from '@ngrx/store';

export enum AppActionTypes {
    NOOP = '[App] NOOP',
    EFFECT_ERROR = '[Error] Effect Error'
}

export class EffectError implements Action {
    readonly type = AppActionTypes.EFFECT_ERROR;
  }

export class NoopAction implements Action {
    readonly type = AppActionTypes.NOOP;
}

export type AppActions = NoopAction 
| EffectError;