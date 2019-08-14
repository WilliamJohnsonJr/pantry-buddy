import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray, combineLatest } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';

// Models
import { Ingredient } from '@app/meals/models/ingredient.model';
// Actions
import * as IngredientQuantityActions from '../actions/ingredient-quantity.actions';
import * as IngredientActions from '../actions/ingredient.actions'

// Services
import { IngredientService } from '@app/meals/services/ingredient.service';

// Reducers
import * as fromMeals from '@app/meals/reducers';
import { Noop } from '@app/core/actions/util.actions';

@Injectable()
export class IngredientEffects {
  // CONSTRUCTOR is at bottom of file

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
  loadIngredientsRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType(IngredientActions.IngredientActionTypes.LoadIngredientsRequest),
    switchMap(() =>
      this.store.pipe(
        select(fromMeals.getAllIngredientsLoadedParentSelector),
        // If ingredients already loaded, Noop. Else, get ingredients from server and emit resulting actions.
        switchMap(loaded => loaded 
          ? of(new IngredientActions.IngredientsAlreadyLoaded()) 
          : this.ingredientService.getIngredients().pipe(
            map((payload: Ingredient[]) => {
              const ingredientPayload: {ingredients: Ingredient[]} = {ingredients: payload};
              console.log('loading ingredients')
              return new IngredientActions.LoadIngredients({ingredients: ingredientPayload.ingredients});
            }),
            catchError((error: HttpErrorResponse) => {
             return of(new IngredientActions.LoadIngredientsRequestFail({error: error.status + ' - ' + error.message}))
            })
        )))
    )
  );

  // This is a splitter effect that, upon successful load, selects the ingredient, loads its ingredient quantities,
  // and adds the ingredient to the store. If ingredient is already in store, Noop.
  @Effect()
  loadIngredientRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType(IngredientActions.IngredientActionTypes.LoadIngredientRequest),
    switchMap((action: IngredientActions.LoadIngredientRequest) => 
      this.store.pipe(
        select(fromMeals.isSelectedIngredientInList),
        switchMap(isInList => !isInList 
          ?  this.ingredientService.getIngredient(action.payload.id).pipe(
            map((payload: Ingredient) => {
              const ingredientPayload: {ingredient: Ingredient} = {ingredient: payload};
              return new IngredientActions.AddIngredient({ingredient: ingredientPayload.ingredient});
            })
          )
          : of (new IngredientActions.IngredientAlreadyLoaded())
          ),
          catchError((error: HttpErrorResponse) => {
            return of(new IngredientActions.LoadIngredientRequestFail({error: error.status + ' - ' + error.message}))
           })
        )
      )
    )

    // @Effect() updateIngredientRequestEffect$: Observable<Noop> = this.actions$.pipe(
    //   ofType(IngredientActions.IngredientActionTypes.UpdateIngredientRequest),
    //   switchMap((action: IngredientActions.UpdateIngredientRequest): Observable<any> => {
    //    return this.ingredientService.updateIngredient(action.payload.ingredient)
    //   }),
    //   map(res => new Noop())
      // TODO: Finish writing logic once updateIngredient method completed.
      // mergeMap((response: [any, IngredientActions.UpdateIngredientRequest]) => {
      //   const action: IngredientActions.UpdateIngredientRequest = response[1];
      //   return [
      //   new IngredientActions.UpdateIngredient({ingredient: {id: action.payload.ingredient.id, changes: action.payload.ingredient}}),
      //   new IngredientQuantityActions.LoadIngredientQuantities({ingredientQuantities: action.payload.ingredient.ingredientQuantities}),
      //   new IngredientActions.AddIngredient({ingredient: ingredientPayload.ingredient})
      // ]}),
      // catchError((error: HttpErrorResponse) => {
      //   return of(new IngredientActions.UpdateIngredientRequestFail({error: error.status + ' - ' + error.message}))
      //  })
    // )

//   @Effect()
//   addIngredientToIngredient$: Observable<Action> = this.actions$.pipe(
//     ofType<AddIngredient>(IngredientActionTypes.AddIngredient),
//     map(action => action.payload),
//     mergeMap(ingredient =>
//       this.db.insert('ingredients', [ingredient]).pipe(
//         map(() => new AddIngredientSuccess(ingredient)),
//         catchError(() => of(new AddIngredientFail(ingredient)))
//       )
//     )
//   );

//   @Effect()
//   removeIngredientFromIngredient$: Observable<Action> = this.actions$.pipe(
//     ofType<RemoveIngredient>(IngredientActionTypes.RemoveIngredient),
//     map(action => action.payload),
//     mergeMap(ingredient =>
//       this.db.executeWrite('ingredients', 'delete', [ingredient.id]).pipe(
//         map(() => new RemoveIngredientSuccess(ingredient)),
//         catchError(() => of(new RemoveIngredientFail(ingredient)))
//       )
//     )
//   );

  constructor(
    private actions$: Actions, 
    private ingredientService: IngredientService, 
    private store: Store<fromMeals.State>
    ) {}
}