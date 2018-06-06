import { Action } from '@ngrx/store';
import { Meal } from './meal.model';
import { HttpErrorResponse } from '@angular/common/http';

export enum MealActionTypes {
  LOAD_MEAL = '[Meals] Load Meal',
  LOAD_MEAL_DETAILS = '[Meals] Load Meal Details',
  LOAD_MEALS = '[Meals] Load Meals',
  LOAD_MEALS_SUCCESS = '[Meals] Load Meals success',
  UPDATE_MEAL = '[Meals] Meal update',
  UPDATE_MEAL_SUCCESS = '[Meals] Update Meal Success',
  SELECT_MEAL = '[Meals] Meal selected',
  ADD_MEAL = '[Meals] Add meal'
}

export class LoadMealsAction implements Action {
  readonly type = MealActionTypes.LOAD_MEALS;
  constructor(public payload = null) {}
}

export class LoadMealsSuccessAction implements Action {
    readonly type = MealActionTypes.LOAD_MEALS_SUCCESS;
    constructor(public payload: Meal[]) {}
}

export class LoadMealDetailsAction implements Action {
  readonly type = MealActionTypes.LOAD_MEAL_DETAILS;
  constructor(public payload: string) {}
}
  
export class UpdateMealAction implements Action {
  readonly type = MealActionTypes.UPDATE_MEAL;
  constructor(public payload: Meal) {}
}
  
export class UpdateMealSuccessAction implements Action {
  readonly type = MealActionTypes.UPDATE_MEAL_SUCCESS;
  constructor(public payload: Meal) { }
}

export class LoadMealAction implements Action {
  readonly type = MealActionTypes.LOAD_MEAL;
  constructor(public payload: string) {}
}

export class SelectMealAction implements Action {
  readonly type = MealActionTypes.SELECT_MEAL;

  constructor(public payload: string) { }
}

export class AddMealAction implements Action {
  readonly type = MealActionTypes.ADD_MEAL;

  constructor(public payload: Meal) { }
}
    
export type MealActions = 
LoadMealsAction
| LoadMealsSuccessAction
| UpdateMealAction
| UpdateMealSuccessAction 
| LoadMealAction
| SelectMealAction
| AddMealAction;