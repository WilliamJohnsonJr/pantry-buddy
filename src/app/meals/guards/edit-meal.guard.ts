/**
 * // This code adapted from the NgRx Example App at https://github.com/ngrx/platform/blob/master/example-app/ under the following license:
 * 
 **/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, zip } from 'rxjs';
import { filter, map, take, tap  } from 'rxjs/operators';
import * as MealActions from '../actions/meal.actions';
import * as fromMeals from '../reducers';
import * as IngredientActions from '../actions/ingredient.actions';

@Injectable({
  providedIn: 'root'
})
export class EditMealGuard  {
  constructor(
    private store: Store<fromMeals.State>,
  ) {}

  /**
   * `hasMeal` composes `hasMealInStore` and `hasMealInApi`. It first checks
   * if the meal is in store, and if not it then checks if it is in the
   * API.
   */
  hasMeal(id: number): Observable<boolean> {
    // We start by updating the store so that the ID in the route is the ID of our selected meal.
    this.store.dispatch(new MealActions.SelectMealById({id: id}));
    // We fetch the meal from the store or the API with this action.
    this.store.dispatch(new MealActions.LoadEditMealRequest({id: id}));
    return zip(
      this.store.select(fromMeals.getSelectedMeal),
      this.store.select(fromMeals.getMealsLoading),
      this.store.select(fromMeals.getAllIngredientsLoadedParentSelector),
      this.store.select(fromMeals.getIngredientsLoading)
     )  
    .pipe(
      // Only navigate to the page if the meal and ingredients have loaded into the store.
      map(([meal, loading, ingredientsLoaded, ingredientsLoading]) => [!!meal, ingredientsLoaded]),
      filter(([meal, ingredientsLoaded]): boolean => {
        return (meal);
      }),
      take(1),
      map(meal => !!meal),
    )
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
    return this.hasMeal(id);
  }
}
