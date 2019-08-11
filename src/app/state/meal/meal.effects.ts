import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {MealActions, MealActionTypes, HttpGETMealFailure, HttpGETMealsFailure, UpsertMeals, UpsertMeal} from '@state/meal/meal.actions';
import { MealService } from '@app/services/meal.service';
import { Router } from '@angular/router';
import { switchMap, map, withLatestFrom, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { Meal } from './meal.model';
import { AddMeals, HttpGETMealsSuccess, HttpGETMeals, SelectMeal, HttpGETMeal, AddMeal } from './meal.actions';
import { State, selectCurrentMeal, selectAllMeals } from '@state/reducers'
import { Store } from '@ngrx/store';
import * as fromMeal from '@state/meal/meal.reducer';
import { of, Observable } from 'rxjs';
import { AlreadyLoaded } from '@app/state/base/base.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IngredientQuantity } from '../ingredient-quantity/ingredient-quantity.model';
import { Ingredient } from '../ingredient/ingredient.model';
import { AddIngredientQuantities, UpsertIngredientQuantities } from '../ingredient-quantity/ingredient-quantity.actions';
import { AddIngredients, UpsertIngredients, UpsertIngredient } from '../ingredient/ingredient.actions';


@Injectable()
export class MealEffects {
  constructor(
    private actions$: Actions<MealActions>,
    private store: Store<State>,
    private mealService: MealService,
    private router: Router) {
  }

  @Effect() getMeals$ = this.actions$
    .ofType(MealActionTypes.HttpGETMeals).pipe(
      withLatestFrom(this.store.select(selectAllMeals)),
      switchMap(([action, currentMeals]) => {
        return currentMeals && currentMeals.length ? of(null)
        : this.mealService.getMeals()
      }),
      mergeMap((data: {
        meals: Meal[],
        ingredientQuantities: IngredientQuantity[],
        ingredients: Ingredient[]
      } | null): [HttpGETMealsSuccess, UpsertMeals, UpsertIngredientQuantities, UpsertIngredients] | [any] => {
          return data ? [
            new HttpGETMealsSuccess(),
            new UpsertMeals({meals: data.meals}),
            new UpsertIngredientQuantities({ingredientQuantities: data.ingredientQuantities}),
            new UpsertIngredients({ingredients: data.ingredients})
          ] : [new AlreadyLoaded()]
      }),
      catchError((error: HttpErrorResponse | Error) => of(new HttpGETMealsFailure(error))),
    );

    @Effect() selectMeal$ = this.actions$
    .ofType(MealActionTypes.SelectMeal).pipe(
      map((action) => {
        return new HttpGETMeal(action.payload);
      })
    );

    @Effect() getMeal$ = this.actions$
    .ofType(MealActionTypes.HttpGETMeal).pipe(
      withLatestFrom(this.store.select(selectCurrentMeal)),
      switchMap(([action, currentMeal]) => {
        return currentMeal ? of(null)
        : this.mealService.getMeal(action.payload)
      }),
      mergeMap((data: {
        meal: Meal,
        ingredientQuantities: IngredientQuantity[],
        ingredients: Ingredient[]
      } | null): [UpsertMeal, UpsertIngredientQuantities, UpsertIngredients] | [any] => {
        return data
        ? [
            new UpsertMeal({meal: data.meal}),
            new UpsertIngredientQuantities({ingredientQuantities: data.ingredientQuantities}),
            new UpsertIngredients({ingredients: data.ingredients})
          ]
        : [new AlreadyLoaded()]
      }),
      catchError((error: HttpErrorResponse | Error) => of(new HttpGETMealFailure(error))),
    )
}