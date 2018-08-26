import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

import { Meal } from '@app/meals/models/meal.model';
import {
  AddMeal,
  MealActionTypes,
  LoadMealsRequestFail,
} from '@app/meals/actions/meal.actions';
import { MealService } from '@app/meals/services/meal.service';
import { LoadMeals } from '@app/meals/actions/meal.actions';
import * as fromMeals from '@app/meals/reducers';
import { HttpErrorResponse } from '@angular/common/http';
import { getAllMealsLoadedParentSelector } from '../reducers/index';
import { Noop } from '@app/core/actions/util.actions';
import { LoadMealsRequest } from '../actions/meal.actions';

@Injectable()
export class MealEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */

  @Effect()
  loadMealsRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType(MealActionTypes.LoadMealsRequest),
    switchMap(() =>
      this.store.pipe(
        select(fromMeals.getAllMealsLoadedParentSelector),
        // If meals already loaded, Noop. Else, get meals from server and emit resulting action.
        switchMap(loaded => loaded ? of(new Noop()) : this.mealService.getMeals().pipe(
          map((meals: Meal[]) => new LoadMeals({meals: meals})),
          catchError((error: HttpErrorResponse) => {
           return of(new LoadMealsRequestFail({error: error.status + ' - ' + error.message}))
          })
        )))
    )
  );

//   @Effect()
//   addMealToMeal$: Observable<Action> = this.actions$.pipe(
//     ofType<AddMeal>(MealActionTypes.AddMeal),
//     map(action => action.payload),
//     mergeMap(meal =>
//       this.db.insert('meals', [meal]).pipe(
//         map(() => new AddMealSuccess(meal)),
//         catchError(() => of(new AddMealFail(meal)))
//       )
//     )
//   );

//   @Effect()
//   removeMealFromMeal$: Observable<Action> = this.actions$.pipe(
//     ofType<RemoveMeal>(MealActionTypes.RemoveMeal),
//     map(action => action.payload),
//     mergeMap(meal =>
//       this.db.executeWrite('meals', 'delete', [meal.id]).pipe(
//         map(() => new RemoveMealSuccess(meal)),
//         catchError(() => of(new RemoveMealFail(meal)))
//       )
//     )
//   );

  constructor(private actions$: Actions, private mealService: MealService, private store: Store<fromMeals.State>) {}
}