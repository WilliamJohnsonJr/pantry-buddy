/**
 * // This code taken from the NgRx Example App at https://github.com/ngrx/platform/blob/master/example-app/
 * 
 **/

import {
    LayoutActionTypes,
    LayoutActionsUnion,
  } from '@app/core/actions/layout.actions';
  
  export interface State {
    showSidenav: boolean;
  }
  
  const initialState: State = {
    showSidenav: false,
  };
  
  export function reducer(
    state: State = initialState,
    action: LayoutActionsUnion
  ): State {
    switch (action.type) {
      case LayoutActionTypes.CloseSidenav:
        return {
          showSidenav: false,
        };
  
      case LayoutActionTypes.OpenSidenav:
        return {
          showSidenav: true,
        };
  
      default:
        return state;
    }
  }
  
  export const getShowSidenav = (state: State) => state.showSidenav;