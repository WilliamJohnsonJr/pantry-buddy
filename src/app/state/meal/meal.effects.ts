import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {MealActions, MealActionTypes} from '@state/meal/meal.actions';
import { MealService } from '@app/services/meal.service';
import { Router } from '@angular/router';
import { switchMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Meal } from './meal.model';
import { AddMeals, LoadMealsSuccess, LoadMeals, SelectMeal, LoadMeal, AddMeal } from './meal.actions';
import { State, selectCurrentMeal } from '@state/reducers'
import { Store } from '@ngrx/store';
import * as fromMeal from '@state/meal/meal.reducer';
import { of } from 'rxjs';
import { AlreadyLoaded } from '@app/state/base/base.actions';
import { selectCurrentMealId } from '@state/reducers/index';


@Injectable()
export class MealEffects {
  constructor(
    private actions$: Actions<MealActions>,
    private store: Store<State>,
    private mealService: MealService,
    private router: Router) {
  }

  @Effect() getMeals$ = this.actions$
    .ofType(MealActionTypes.LoadMeals).pipe(
      switchMap(() => {
          return this.mealService.getMeals();
      }),
      map((meals: Meal[]) => {
          return new LoadMealsSuccess({meals: meals})
      })
    );

    @Effect() selectMeal$ = this.actions$
    .ofType(MealActionTypes.SelectMeal).pipe(
      map((action) => {
        return new LoadMeal(action.payload);
      })
    );

    @Effect() getMeal$ = this.actions$
    .ofType(MealActionTypes.LoadMeal).pipe(
      withLatestFrom(this.store.select(selectCurrentMeal)),
      switchMap(([action, currentMeal]) => {
        return currentMeal ? of(null)
        : this.mealService.getMeal(action.payload)
      }),
      map((meal: Meal | null) => {
        return meal
        ? new AddMeal({meal: meal})
        : new AlreadyLoaded()
      })
    )
}