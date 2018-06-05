import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take, tap, switchMap, withLatestFrom, catchError, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IngredientQuantity } from './ingredient-quantity.model';
import { ApplicationState } from '../../state/app.state';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { IngredientQuantityActionTypes } from './ingredient-quantity.actions';
import { NoopAction, EffectError} from '../app.actions';
import {
    LoadIngredientQuantities,
    AddIngredientQuantity,
    AddIngredientQuantities,
    UpdateIngredientQuantity,
    UpdateIngredientQuantities,
    DeleteIngredientQuantity,
    DeleteIngredientQuantities,
    ClearIngredientQuantities
} from './ingredient-quantity.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IngredientQuantityQuery } from './ingredient-quantity.reducer';


@Injectable()
export class IngredientQuantityFacade {
  // Selectors ##############################
  ingredientQuantities$: Observable<IngredientQuantity[]> = this.store.select(IngredientQuantityQuery.getIngredientQuantities);

  // Action Creators #############################

  constructor(
    private actions$: Actions,
    private store: Store<ApplicationState>,
    private router: Router,
  ) { }

  updateIngredientQuantity(ingredientQuantity: IngredientQuantity): void {
    this.store.dispatch(new UpdateIngredientQuantity(ingredientQuantity));
  }

  getIngredientQuantities(): Observable<IngredientQuantity[]> {
      this.store.dispatch(new LoadIngredientQuantities(null));
      return this.ingredientQuantities$;
  }
}