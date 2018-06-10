import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {MealActions, MealActionTypes} from '@state/meal/meal.actions';
import { MealService } from '@app/services/meal.service';
import { Router } from '@angular/router';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Meal } from './meal.model';
import { AddMeals, LoadMealsSuccess, LoadMeals } from './meal.actions';
import { State } from '@state/reducers'
import { selectMealsLoaded } from '@state/reducers';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AlreadyLoaded } from '@app/state/base/base.actions';


@Injectable()
export class MealEffects {

  loaded$ = this.store.select(selectMealsLoaded);


  constructor(
    private actions$: Actions<MealActions>,
    private store: Store<State>,
    private mealService: MealService,
    private router: Router) {
  }

  @Effect() getMeals$ = this.actions$
    .ofType(MealActionTypes.LoadMeals).pipe(
      withLatestFrom(this.loaded$),
      switchMap(([blank, alreadyLoaded]) => {
        if (alreadyLoaded) {
          return of(null)
        } else {
          return this.mealService.getMeals();
        }
      }),
      map((meals: Meal[] | null) => {
        if (meals) {
          return new LoadMealsSuccess({meals: meals});
        } else {
          return new AlreadyLoaded()
        }
      })
    );
}