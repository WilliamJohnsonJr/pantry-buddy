import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

// Models
import { Meal } from '@app/meals/models/meal.model';
import { IngredientQuantity } from '@app/meals/models/ingredient-quantity.model';
import { Ingredient } from '@app/meals/models/ingredient.model';
import { MealHttp } from '@app/meals/models/meal-http.model';
// Actions
import * as MealActions from '../actions/meal.actions';
import * as IngredientQuantityActions from '../actions/ingredient-quantity.actions';
import * as IngredientActions from '../actions/ingredient.actions'

// Services
import { MealService } from '@app/meals/services/meal.service';

// Reducers
import * as fromMeals from '@app/meals/reducers';

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
    ofType(MealActions.MealActionTypes.LoadMealsRequest),
    switchMap(() =>
      this.store.pipe(
        select(fromMeals.getAllMealsLoadedParentSelector),
        // If meals already loaded, Noop. Else, get meals from server and emit resulting actions.
        switchMap(loaded => loaded ? of(new MealActions.MealsAlreadyLoaded()) : this.mealService.getMeals().pipe(
          map((mealHttps: MealHttp[]) => this.mealService.normalizeMeals(mealHttps)),
          mergeMap((mealPayload: {meals: Meal[], ingredientQuantities: IngredientQuantity[], ingredients: Ingredient[]}) => [
            new IngredientActions.LoadIngredients({ingredients: mealPayload.ingredients}),
            // Has to come first so that loaded flag is false. Otherwise the MealsAlreadyLoaded action interrupts it.
            new IngredientQuantityActions.LoadIngredientQuantities({ingredientQuantities: mealPayload.ingredientQuantities}),
            // Comes second since loaded flag is set in the LoadMeals action.
            new MealActions.LoadMeals({meals: mealPayload.meals})
          ]),
          catchError((error: HttpErrorResponse) => {
           return of(new MealActions.LoadMealsRequestFail({error: error.status + ' - ' + error.message}))
          })
        )))
    )
  );

  // This is a splitter effect that, upon successful load, selects the meal, loads its ingredient quantities,
  // and adds the meal to the store. If meal is already in store, Noop.
  @Effect()
  loadMealRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType(MealActions.MealActionTypes.LoadMealRequest),
    switchMap((action: MealActions.LoadMealRequest) => 
      this.store.pipe(
        select(fromMeals.isSelectedMealInList),
        switchMap(isInList => !isInList 
          ?  this.mealService.getMeal(action.payload.id).pipe(
            map((mealHttp: MealHttp) => this.mealService.normalizeMeal(mealHttp)),
            mergeMap((mealPayload: {meal: Meal, ingredientQuantities: IngredientQuantity[], ingredients: Ingredient[]}) => [
              new IngredientActions.LoadIngredients({ingredients: mealPayload.ingredients}),
              new IngredientQuantityActions.LoadIngredientQuantities({ingredientQuantities: mealPayload.ingredientQuantities}),
              new MealActions.AddMeal({meal: mealPayload.meal})
            ])
          )
          : of (new MealActions.MealAlreadyLoaded())
          ),
          catchError((error: HttpErrorResponse) => {
            return of(new MealActions.LoadMealRequestFail({error: error.status + ' - ' + error.message}))
           })
        )
      )
    )

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