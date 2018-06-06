import { mealReducer, MealState } from './meal/meal.reducer';
import { ActionReducerMap, State } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '@env/environment';
import { IngredientQuantityState, ingredientQuantityReducer } from '@app/state/ingredient-quantity/ingredient-quantity.reducer';

export interface ApplicationState {
  meals: MealState;
  ingredientQuantities: IngredientQuantityState;
}

export const ROOT_REDUCER
  : ActionReducerMap<ApplicationState> = {
      meals: mealReducer,
      ingredientQuantities: ingredientQuantityReducer
}

export const META_REDUCERS = !environment.production ? [storeFreeze] : [];