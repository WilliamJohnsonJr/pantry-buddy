/**
 * // This code taken from the NgRx Example App at https://github.com/ngrx/platform/blob/master/example-app/app/reducers/index.ts
 * 
 * The MIT License (MIT)

Copyright (c) 2017 Brandon Roberts, Mike Ryan, Victor Savkin, Rob Wormald

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 * 
 */

import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
  } from '@ngrx/store';
  import { environment } from 'environments/environment';
  import * as fromRouter from '@ngrx/router-store';

  /**
   * storeFreeze prevents state from being mutated. When mutation occurs, an
   * exception will be thrown. This is useful during development mode to
   * ensure that none of the reducers accidentally mutates the state.
   */
  import { storeFreeze } from 'ngrx-store-freeze';
  
  /**
   * Every reducer module's default export is the reducer function itself. In
   * addition, each module should export a type or interface that describes
   * the state of the reducer plus any selector functions. The `* as`
   * notation packages up all of the exports into a single object.
   */
  
  import * as fromLayout from '@app/core/reducers/layout.reducer';
  
  /**
   * As mentioned, we treat each reducer like a table in a database. This means
   * our top level state interface is just a map of keys to inner state types.
   */
  export interface State {
    layout: fromLayout.State;
    router: fromRouter.RouterReducerState;
  }
  
  /**
   * Our state is composed of a map of action reducer functions.
   * These reducer functions are called with each dispatched action
   * and the current or initial state and return a new immutable state.
   */
  export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer,
    router: fromRouter.routerReducer,
  };
  
  // console.log all actions
  export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: any): State {
      // console.log('state', state);
      // console.log('action', action);
  
      return reducer(state, action);
    };
  }
  
  /**
   * By default, @ngrx/store uses combineReducers with the reducer map to compose
   * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
   * that will be composed to form the root meta-reducer.
   */
  export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, storeFreeze]
    : [];
  
  /**
   * Layout Reducers
   */
  export const getLayoutState = createFeatureSelector<State, fromLayout.State>(
    'layout'
  );
  
  export const getShowSidenav = createSelector(
    getLayoutState,
    fromLayout.getShowSidenav
  );