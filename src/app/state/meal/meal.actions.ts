import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Meal } from './meal.model';
import { HttpErrorResponse } from '@angular/common/http';

export enum MealActionTypes {
  HttpGETMeals = '[Meal] HttpGET Meals',
  HttpGETMealsSuccess = '[Meal] HttpGET Meals Success',
  HttpGETMealsFailure = '[Meal] HttpGET Meals Failure',
  HttpGETMeal = '[Meal] HttpGET Meal',
  HttpGETMealSuccess = '[Meal] HttpGET Meal Success',
  HttpGETMealFailure = '[Meal] HttpGET Meal Failure',
  AddMeal = '[Meal] Add Meal',
  SelectMeal = '[Meal] Select Meal',
  UpsertMeal = '[Meal] Upsert Meal',
  AddMeals = '[Meal] Add Meals',
  UpsertMeals = '[Meal] Upsert Meals',
  UpdateMeal = '[Meal] Update Meal',
  UpdateMeals = '[Meal] Update Meals',
  DeleteMeal = '[Meal] Delete Meal',
  DeleteMeals = '[Meal] Delete Meals',
  ClearMeals = '[Meal] Clear Meals'
}

export class HttpGETMeals implements Action {
  readonly type = MealActionTypes.HttpGETMeals;

  constructor(public payload = null) {}
}

export class HttpGETMealsSuccess implements Action {
  readonly type = MealActionTypes.HttpGETMealsSuccess;

  constructor(public payload = null) {}
}

export class HttpGETMealsFailure implements Action {
  readonly type = MealActionTypes.HttpGETMealsFailure;
  constructor(public payload: HttpErrorResponse | Error){}
}

export class HttpGETMeal implements Action {
  readonly type = MealActionTypes.HttpGETMeal;
  constructor(public payload: string){}
}

export class HttpGETMealSuccess implements Action {
  readonly type = MealActionTypes.HttpGETMealSuccess;
  constructor(public payload = null){}
}

export class HttpGETMealFailure implements Action {
  readonly type = MealActionTypes.HttpGETMealFailure;
  constructor(public payload: HttpErrorResponse | Error){}
}

export class AddMeal implements Action {
  readonly type = MealActionTypes.AddMeal;

  constructor(public payload: {meal: Meal}) {}
}

export class UpsertMeal implements Action {
  readonly type = MealActionTypes.UpsertMeal;

  constructor(public payload: { meal: Meal }) {}
}

export class AddMeals implements Action {
  readonly type = MealActionTypes.AddMeals;

  constructor(public payload: {meals: Meal[]}) {}
}

export class SelectMeal implements Action {
  readonly type = MealActionTypes.SelectMeal;
  constructor (public payload: string){}
}

export class UpsertMeals implements Action {
  readonly type = MealActionTypes.UpsertMeals;

  constructor(public payload: { meals: Meal[] }) {}
}

export class UpdateMeal implements Action {
  readonly type = MealActionTypes.UpdateMeal;

  constructor(public payload: { meal: Update<Meal> }) {}
}

export class UpdateMeals implements Action {
  readonly type = MealActionTypes.UpdateMeals;

  constructor(public payload: { meals: Update<Meal>[] }) {}
}

export class DeleteMeal implements Action {
  readonly type = MealActionTypes.DeleteMeal;

  constructor(public payload: { id: string }) {}
}

export class DeleteMeals implements Action {
  readonly type = MealActionTypes.DeleteMeals;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearMeals implements Action {
  readonly type = MealActionTypes.ClearMeals;
  constructor(public payload = null){}
}

export type MealActions =
 HttpGETMeals
 | HttpGETMealsSuccess
 | HttpGETMealsFailure
 | HttpGETMeal
 | HttpGETMealSuccess
 | HttpGETMealFailure
 | AddMeal
 | SelectMeal
 | UpsertMeal
 | AddMeals
 | UpsertMeals
 | UpdateMeal
 | UpdateMeals
 | DeleteMeal
 | DeleteMeals
 | ClearMeals;
