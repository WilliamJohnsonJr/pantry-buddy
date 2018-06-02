import { mealReducer, MealState } from './meal/meal.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '@env/environment';

export interface ApplicationState {
  meals: MealState;
}

export const ROOT_REDUCER
  : ActionReducerMap<ApplicationState> = {
      meals: mealReducer
}

export const META_REDUCERS = !environment.production ? [storeFreeze] : [];