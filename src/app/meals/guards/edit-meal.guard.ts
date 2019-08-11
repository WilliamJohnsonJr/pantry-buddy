/**
 * // This code adapted from the NgRx Example App at https://github.com/ngrx/platform/blob/master/example-app/ under the following license:
 * 
 **/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap,  } from 'rxjs/operators';
import * as MealActions from '../actions/meal.actions';
import * as fromMeals from '../reducers';
import { Meal } from '@app/meals/models/meal.model';
import { MealService } from '@app/meals/services/meal.service';
import { MealHttp } from '../models/meal-http.model';

@Injectable({
  providedIn: 'root'
})
export class EditMealGuard implements CanActivate {
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
  waitForMealToLoad(): Observable<boolean> {
      return this.store.pipe(
        select(fromMeals.getSelectedMealLoadedParentSelector),
        filter(loaded => loaded),
        take(1)
      )
  }

  waitForIngredientsToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromMeals.getAllIngredientsLoadedParentSelector),
        filter(loaded => loaded),
        take(1)
    )
  }

  /**
   * This method checks if a meal with the given ID is already registered
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
   * This method loads a meal with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasMealInApi(id: number): Observable<boolean> {
    return this.mealService.getMeal(id).pipe(
      map((meal: MealHttp): MealActions.AddMeal => new MealActions.AddMeal({meal: meal})),
      tap((action: MealActions.AddMeal) => {
        this.store.dispatch(action);
      }),
      map((mealAction: MealActions.AddMeal): boolean => !!mealAction.payload.meal),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  /**
   * `hasMeal` composes `hasMealInStore` and `hasMealInApi`. It first checks
   * if the meal is in store, and if not it then checks if it is in the
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
   * to request a meal from the API or if we already have it in our cache.
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
    // We start by updating the store so that the ID in the route is the ID of our selected meal.
    this.store.dispatch(new MealActions.SelectMealById({id: id}));
    // We must call LoadEditMealsRequest here for this.waitForCollectionToLoad to ever fire.
    this.store.dispatch(new MealActions.LoadEditMealRequest({id: id}));
    return this.waitForMealToLoad().pipe(
      switchMap(() => this.waitForIngredientsToLoad()),
      switchMap(() => this.hasMeal(+next.params['id']))
    );
  }
}
