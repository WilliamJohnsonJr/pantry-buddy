import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import *  as fromRoot from '@app/reducers';
import * as LayoutActions from '@app/core/actions/layout.actions';
import { MatSidenav } from '@angular/material';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav-shell',
  templateUrl: './app-nav-shell.component.html',
  styleUrls: ['./app-nav-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavShellComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver, private store: Store<fromRoot.State>) {}
  @ViewChild('drawer') drawer: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        result.matches ? this.store.dispatch( new LayoutActions.CloseSidenav()) : this.store.dispatch(new LayoutActions.OpenSidenav());
        return result.matches;
      })
    );

/**
 * // Code below taken from the NgRx Example App at https://github.com/ngrx/platform/blob/master/example-app/
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

  showSidenav$: Observable<boolean>;
  ngOnInit() {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
  }
  
  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new LayoutActions.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new LayoutActions.OpenSidenav());
  }

  logout() {
    this.closeSidenav();
  }
}
