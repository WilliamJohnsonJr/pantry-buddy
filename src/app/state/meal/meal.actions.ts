import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Meal } from './meal.model';

export enum MealActionTypes {
  LoadMeals = '[Meal] Load Meals',
  LoadMealsSuccess = '[Meal] Load Meals Success',
  LoadMeal = '[Meal] Load Meal',
  LoadMealSuccess = '[Meal] Load Meal Success',
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

export class LoadMeals implements Action {
  readonly type = MealActionTypes.LoadMeals;

  constructor(public payload = null) {}
}

export class LoadMealsSuccess implements Action {
  readonly type = MealActionTypes.LoadMealsSuccess;

  constructor(public payload: { meals: Meal[]}) {}
}

export class LoadMeal implements Action {
  readonly type = MealActionTypes.LoadMeal;
  constructor(public payload: string){}
}

export class LoadMealSuccess implements Action {
  readonly type = MealActionTypes.LoadMealSuccess;
  constructor(public payload: {meal: Meal}){}
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
 LoadMeals
 | LoadMealsSuccess
 | LoadMeal
 | LoadMealSuccess
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
