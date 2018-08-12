/**
 * // This code taken from the NgRx Example App at https://github.com/ngrx/platform/blob/master/example-app/
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
    LayoutActionTypes,
    LayoutActionsUnion,
  } from '../actions/layout.actions';
  
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