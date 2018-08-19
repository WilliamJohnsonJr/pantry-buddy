/**
 * // This code adapted from the NgRx Example App at https://github.com/ngrx/platform/blob/master/example-app/ under the following license:
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

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as MealActions from '../actions/meal.actions';
import * as fromMeals from '../reducers';
import { Meal } from '@app/meals/models/meal.model';
import { MealService } from '@app/meals/services/meal.service';

@Injectable({
  providedIn: 'root'
})
export class MealExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromMeals.State>,
    private mealService: MealService,
    private router: Router
  ) {}
  

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromMeals.getAllMealsLoadedParentSelector),
      filter(loaded => loaded),
      take(1)
    );
  }

  /**
   * This method checks if a book with the given ID is already registered
   * in the Store
   */
  hasMealInStore(id: number): Observable<boolean> {
    return this.store.pipe(
      select(fromMeals.getMealEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }

  /**
   * This method loads a book with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasMealInApi(id: number): Observable<boolean> {
    return this.mealService.getMeal(id).pipe(
      map((meal: Meal) => new MealActions.AddMeal({meal: meal})),
      tap((action: MealActions.AddMeal) => this.store.dispatch(action)),
      map(meal => !!meal),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  /**
   * `hasMeal` composes `hasMealInStore` and `hasMealInApi`. It first checks
   * if the book is in store, and if not it then checks if it is in the
   * API.
   */
  hasMeal(id: number): Observable<boolean> {
    return this.hasMealInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasMealInApi(id);
      })
    );
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a book from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean  {
    let id: number = +next.paramMap.get('id');
    this.store.dispatch(new MealActions.SelectMealById({id: id}));
    return this.waitForCollectionToLoad().pipe(
      switchMap(() => this.hasMeal(+next.params['id']))
    );
  }
}
