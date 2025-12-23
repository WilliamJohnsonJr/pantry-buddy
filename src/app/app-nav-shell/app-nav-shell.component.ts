import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import *  as fromRoot from '@app/reducers';
import * as LayoutActions from '@app/core/actions/layout.actions';
import { MatSidenav } from '@angular/material/sidenav';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-nav-shell',
    templateUrl: './app-nav-shell.component.html',
    styleUrls: ['./app-nav-shell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AppNavShellComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver, private store: Store<fromRoot.State>) {}
  @ViewChild('drawer', { static: false }) drawer: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        result.matches 
          ? this.store.dispatch( new LayoutActions.CloseSidenav()) 
          : this.store.dispatch(new LayoutActions.OpenSidenav());
        return result.matches;
      })
    );

/**
 * // Code below taken from the NgRx Example App at https://github.com/ngrx/platform/blob/master/example-app/
 * 
 **/

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
