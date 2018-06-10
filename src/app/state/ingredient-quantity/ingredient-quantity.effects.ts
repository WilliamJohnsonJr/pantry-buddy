import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {IngredientQuantityActions, IngredientQuantityActionTypes} from '@state/ingredient-quantity/ingredient-quantity.actions';
import { IngredientQuantityService } from '@app/services/ingredient-quantity.service';
import { Router } from '@angular/router';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { IngredientQuantity } from './ingredient-quantity.model';
import { AddIngredientQuantities, AddIngredientQuantitiesSuccess } from './ingredient-quantity.actions';
import { State } from '@state/reducers'
import { selectIngredientQuantitiesLoaded } from '@state/reducers';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AlreadyLoaded } from '@app/state/base/base.actions';


@Injectable()
export class IngredientQuantityEffects {

  loaded$ = this.store.select(selectIngredientQuantitiesLoaded);


  constructor(
    private actions$: Actions<IngredientQuantityActions>,
    private store: Store<State>,
    private ingredientQuantityService: IngredientQuantityService,
    private router: Router) {
  }

  @Effect() getIngredientQuantities$ = this.actions$
    .ofType(IngredientQuantityActionTypes.AddIngredientQuantities).pipe(
      withLatestFrom(this.loaded$),
      switchMap(([blank, alreadyLoaded]) => {
        if (alreadyLoaded) {
          return of(null)
        } else {
          return this.ingredientQuantityService.getIngredientQuantities();
        }
      }),
      map((ingredientQuantities: IngredientQuantity[] | null) => {
        if (ingredientQuantities) {
          return new AddIngredientQuantitiesSuccess({ingredientQuantities: ingredientQuantities})
        } else {
          return new AlreadyLoaded()
        }
      })
    );
}