import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {IngredientQuantityActions, IngredientQuantityActionTypes} from '@state/ingredient-quantity/ingredient-quantity.actions';
import { IngredientQuantityService } from '@app/services/ingredient-quantity.service';
import { Router } from '@angular/router';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { IngredientQuantity } from './ingredient-quantity.model';
import { AddIngredientQuantities } from './ingredient-quantity.actions';
import { State } from '@state/reducers'
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AlreadyLoaded } from '@app/state/base/base.actions';


@Injectable()
export class IngredientQuantityEffects {

  constructor(
    private actions$: Actions<IngredientQuantityActions>,
    private store: Store<State>,
    private ingredientQuantityService: IngredientQuantityService,
    private router: Router) {
  }

  @Effect() getIngredientQuantities$ = this.actions$
    .ofType(IngredientQuantityActionTypes.HttpGETIngredientQuantities).pipe(
      switchMap(()=> {
        return this.ingredientQuantityService.getIngredientQuantities();
      }),
      map((ingredientQuantities: IngredientQuantity[]) => {
          return new AddIngredientQuantities({ingredientQuantities: ingredientQuantities})
      })
    );
}