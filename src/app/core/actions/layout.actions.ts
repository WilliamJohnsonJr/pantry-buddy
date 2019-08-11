/**
 * // This code taken from the NgRx Example App at https://github.com/ngrx/platform/blob/master/example-app/
 * 
 **/

import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidenav = '[App Nav Shell] Open Sidenav',
  CloseSidenav = '[App Nav Shell] Close Sidenav'
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CloseSidenav;
}

export type LayoutActionsUnion = OpenSidenav | CloseSidenav;