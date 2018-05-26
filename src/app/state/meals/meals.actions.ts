import { Action } from '@ngrx/store';
import { Meal } from '../../interfaces/meal.interface';

export enum MealsActionTypes {
  LOAD_MEAL = '[Meals] Load Meal',
  LOAD_MEAL_DETAILS = '[Meals] Load Meal Details',
  LOAD_MEALS = '[Meals] Load Meals',
  LOAD_MEALS_SUCCESS = '[Meals] Load success',
  UPDATE_MEAL = '[Meals] Meal update',
  UPDATE_MEAL_SUCCESS = '[Meals] Update Meal Success',
  SELECT_MEAL = '[Meals] Meal selected',
  ADD_MEAL = '[Meals] Add meal'
}

export class LoadMealsAction implements Action {
  readonly type = MealsActionTypes.LOAD_MEALS;
  constructor(public payload = null) {}
}

export class LoadMealsSuccessAction implements Action {
    readonly type = MealsActionTypes.LOAD_MEALS_SUCCESS;
    constructor(public payload: Meal[]) {}
}

export class LoadMealDetailsAction implements Action {
  readonly type = MealsActionTypes.LOAD_MEAL_DETAILS;
  constructor(public payload: string) {}
}
  
export class UpdateMealAction implements Action {
  readonly type = MealsActionTypes.UPDATE_MEAL;
  constructor(public payload: Meal) {}
}
  
export class UpdateMealSuccessAction implements Action {
  readonly type = MealsActionTypes.UPDATE_MEAL_SUCCESS;
  constructor(public payload: Meal) { }
}

export class LoadMealAction implements Action {
  readonly type = MealsActionTypes.LOAD_MEAL;
  constructor(public payload: number) {}
}

export class SelectMealAction implements Action {
  readonly type = MealsActionTypes.SELECT_MEAL;

  constructor(public payload: string) { }
}

export class AddMealAction implements Action {
  readonly type = MealsActionTypes.ADD_MEAL;

  constructor(public payload: Meal) { }
}
    
export type MealsActions = 
LoadMealsAction
| LoadMealsSuccessAction
| UpdateMealAction
| UpdateMealSuccessAction 
| LoadMealAction
| SelectMealAction
| AddMealAction;