import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import {
    LoadIngredientQuantities,
    LoadIngredientQuantitiesSuccess,
    AddIngredientQuantity,
    AddIngredientQuantities,
    UpdateIngredientQuantity,
    UpdateIngredientQuantitySuccess,
    UpdateIngredientQuantities,
    DeleteIngredientQuantity,
    DeleteIngredientQuantities,
    ClearIngredientQuantities,
    IngredientQuantityActionTypes,
    IngredientQuantityActions
} from '@state/ingredient-quantity/ingredient-quantity.actions';
import { IngredientQuantitiesService } from '@app/services/ingredient-quantities.service';
import { IngredientQuantity } from './ingredient-quantity.model';
import { MealActions } from '../meal/meal.actions';

@Injectable()
export class IngredientQuantityEffects {
  constructor(
    private actions$: Actions<IngredientQuantityActions | MealActions>,
    private ingredientQuantitiesService: IngredientQuantitiesService,
    private router: Router) {
  }

  @Effect() getIngredientQuantities$ = this.actions$
    .ofType(IngredientQuantityActionTypes.LOAD_INGREDIENT_QUANTITIES).pipe(
      switchMap(() => {
          return this.ingredientQuantitiesService.getIngredientQuantities()
        }),
      map((ingredientQuantities: IngredientQuantity[]) => new LoadIngredientQuantitiesSuccess(ingredientQuantities))
    );

  @Effect() updateIngredientQuantity$ = this.actions$
    .ofType(IngredientQuantityActionTypes.UPDATE_INGREDIENT_QUANTITY).pipe(
      map(action => action.payload),
      switchMap((ingredientQuantity: IngredientQuantity) => this.ingredientQuantitiesService.updateIngredientQuantity(ingredientQuantity)),
      tap((ingredientQuantity: IngredientQuantity) => this.router.navigate(['/ingredientQuantity', ingredientQuantity.id])),
      map((ingredientQuantity: IngredientQuantity) => new UpdateIngredientQuantitySuccess(ingredientQuantity))
    );
}