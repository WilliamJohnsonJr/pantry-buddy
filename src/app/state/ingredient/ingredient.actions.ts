import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Ingredient } from './ingredient.model';

export enum IngredientActionTypes {
  LoadIngredients = '[Ingredient] Load Ingredients',
  AddIngredient = '[Ingredient] Add Ingredient',
  UpsertIngredient = '[Ingredient] Upsert Ingredient',
  AddIngredients = '[Ingredient] Add Ingredients',
  UpsertIngredients = '[Ingredient] Upsert Ingredients',
  UpdateIngredient = '[Ingredient] Update Ingredient',
  UpdateIngredients = '[Ingredient] Update Ingredients',
  DeleteIngredient = '[Ingredient] Delete Ingredient',
  DeleteIngredients = '[Ingredient] Delete Ingredients',
  ClearIngredients = '[Ingredient] Clear Ingredients'
}

export class LoadIngredients implements Action {
  readonly type = IngredientActionTypes.LoadIngredients;

  constructor(public payload: { ingredients: Ingredient[] }) {}
}

export class AddIngredient implements Action {
  readonly type = IngredientActionTypes.AddIngredient;

  constructor(public payload: { ingredient: Ingredient }) {}
}

export class UpsertIngredient implements Action {
  readonly type = IngredientActionTypes.UpsertIngredient;

  constructor(public payload: { ingredient: Ingredient }) {}
}

export class AddIngredients implements Action {
  readonly type = IngredientActionTypes.AddIngredients;

  constructor(public payload: { ingredients: Ingredient[] }) {}
}

export class UpsertIngredients implements Action {
  readonly type = IngredientActionTypes.UpsertIngredients;

  constructor(public payload: { ingredients: Ingredient[] }) {}
}

export class UpdateIngredient implements Action {
  readonly type = IngredientActionTypes.UpdateIngredient;

  constructor(public payload: { ingredient: Update<Ingredient> }) {}
}

export class UpdateIngredients implements Action {
  readonly type = IngredientActionTypes.UpdateIngredients;

  constructor(public payload: { ingredients: Update<Ingredient>[] }) {}
}

export class DeleteIngredient implements Action {
  readonly type = IngredientActionTypes.DeleteIngredient;

  constructor(public payload: { id: string }) {}
}

export class DeleteIngredients implements Action {
  readonly type = IngredientActionTypes.DeleteIngredients;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearIngredients implements Action {
  readonly type = IngredientActionTypes.ClearIngredients;
}

export type IngredientActions =
 LoadIngredients
 | AddIngredient
 | UpsertIngredient
 | AddIngredients
 | UpsertIngredients
 | UpdateIngredient
 | UpdateIngredients
 | DeleteIngredient
 | DeleteIngredients
 | ClearIngredients;
