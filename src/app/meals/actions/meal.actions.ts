import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Meal } from '@app/meals/models/meal.model';

export enum MealActionTypes {
  LoadMealsRequest = '[Meal] Load Meals Request',
  LoadMealsRequestFail = '[Meal] Load Meals Request Fail',
  LoadMeals = '[Meal] Load Meals',
  AddMeal = '[Meal] Add Meal',
  UpsertMeal = '[Meal] Upsert Meal',
  AddMeals = '[Meal] Add Meals',
  UpsertMeals = '[Meal] Upsert Meals',
  UpdateMeal = '[Meal] Update Meal',
  UpdateMeals = '[Meal] Update Meals',
  DeleteMeal = '[Meal] Delete Meal',
  DeleteMeals = '[Meal] Delete Meals',
  ClearMeals = '[Meal] Clear Meals'
}

export class LoadMealsRequest implements Action {
  readonly type = MealActionTypes.LoadMealsRequest;
  constructor(public payload = null){}
}

export class LoadMealsRequestFail implements Action {
  readonly type = MealActionTypes.LoadMealsRequestFail;
  constructor(public payload: {error: string}){}
}

export class LoadMeals implements Action {
  readonly type = MealActionTypes.LoadMeals;
  constructor(public payload: {meals: Meal[]}){}
}

export class AddMeal implements Action {
  readonly type = MealActionTypes.AddMeal;

  constructor(public payload: { meal: Meal }) {}
}

export class UpsertMeal implements Action {
  readonly type = MealActionTypes.UpsertMeal;

  constructor(public payload: { meal: Meal }) {}
}

export class AddMeals implements Action {
  readonly type = MealActionTypes.AddMeals;

  constructor(public payload: { meals: Meal[] }) {}
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
}

export type MealActions =
| LoadMealsRequest
| LoadMealsRequestFail
 | LoadMeals
 | AddMeal
 | UpsertMeal
 | AddMeals
 | UpsertMeals
 | UpdateMeal
 | UpdateMeals
 | DeleteMeal
 | DeleteMeals
 | ClearMeals;
