import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take, tap, switchMap, withLatestFrom, catchError, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MealsService } from '../../services/meals.service';
import { Meal } from '../../interfaces/meal.interface';
import { ApplicationState } from '../../state/app.state';
import { MealsQuery } from './meals.reducer';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { MealsActionTypes, LoadMealDetailsAction, LoadMealAction, UpdateMealAction, LoadMealsAction } from './meals.actions';
import { NoopAction, EffectError} from '../app.actions';
import {
  SelectMealAction,
  AddMealAction,
  LoadMealsSuccessAction,
  UpdateMealSuccessAction
} from './meals.actions';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class MealsFacade {
  // Selectors ##############################

  loaded$ = this.store.select(MealsQuery.getLoaded);
  meals$ = this.store.select(MealsQuery.getMeals);
  selectedMeal$ = this.store.select(MealsQuery.getSelectedMeal);

  // Effects #################################

  @Effect() getMeals$ = this.actions$.pipe(
    ofType(MealsActionTypes.LOAD_MEALS),
    withLatestFrom(this.loaded$),
    switchMap(([_, loaded]) => {
      return loaded
        ? of(null)
        : this.mealsService.getMeals();
    }),
    map((meals: Array<Meal> | null) => {
      return meals
        ? new LoadMealsSuccessAction(meals)
        : new NoopAction()
    }),
    catchError((err: HttpErrorResponse) => {
      return of(new EffectError(err))
    })
  );

  // Splitter ################################

  @Effect() getMealDetails$ = this.actions$.pipe(
    ofType(MealsActionTypes.LOAD_MEAL_DETAILS),
    map((action: LoadMealDetailsAction) => action.payload),
    mergeMap(mealId => [
      new SelectMealAction(mealId),
      new LoadMealAction(mealId)
    ])
  );

  // Content-Based Deciders ###################

  @Effect() getMeal$ = this.actions$.pipe(
    ofType(MealsActionTypes.LOAD_MEAL),
    map((action: LoadMealAction) => action.payload),
    withLatestFrom(this.loaded$, this.selectedMeal$),
    switchMap(([mealId, loaded, selectedMeal]) => {
      const mealLoaded = selectedMeal && selectedMeal.id === mealId;
      return loaded || mealLoaded
        ? of(null)
        : this.mealsService.getMeal(mealId);
    }),
    map((meal: Meal | null) => {
      return meal
        ? new AddMealAction(meal)
        : new NoopAction();
    }),
    catchError((err: HttpErrorResponse) => {
      return of(new EffectError(err))
    })
  );

  @Effect() updateMeal$ = this.actions$.pipe(
    ofType(MealsActionTypes.UPDATE_MEAL),
    map((action: UpdateMealAction) => action.payload),
    switchMap((meal: Meal) => this.mealsService.updateMeal(meal)),
    map((meal: Meal) => {
      this.router.navigate(['/meal', meal.id]);
      return new UpdateMealSuccessAction(meal)
    }),
    catchError((err: HttpErrorResponse) => {
      return of(new EffectError(err))
    })
  );

  // Action Creators #############################

  constructor(
    private actions$: Actions,
    private store: Store<ApplicationState>,
    private router: Router,
    private mealsService: MealsService
  ) { }

  getMealDetails(mealId: string): Observable<Meal> {
    this.store.dispatch(new LoadMealDetailsAction(mealId));
    return this.selectedMeal$;
  }

  getMeals(): Observable<Array<Meal>> {
    this.store.dispatch(new LoadMealsAction());
    return this.meals$;
  }

  updateMeal(meal: Meal): void {
    this.store.dispatch(new UpdateMealAction(meal));
  }
}