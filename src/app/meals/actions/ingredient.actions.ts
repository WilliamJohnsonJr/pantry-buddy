import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Ingredient } from '../models/ingredient.model';

export enum IngredientActionTypes {
  LoadIngredientsRequest = '[Ingredient] Load Ingredients Request',
  LoadIngredientsRequestFail = '[Ingredient] Load Ingredients Request Fail',
  LoadIngredients = '[Ingredient] Load Ingredients',
  IngredientsAlreadyLoaded = '[Ingredient] Ingredients Already Loaded',
  LoadIngredientRequest = '[Ingredient] Load Ingredient Request',
  LoadIngredientRequestFail = '[Ingredient] Load Ingredient Request Fail',
  LoadIngredient = '[Ingredient] Load Ingredient',
  IngredientAlreadyLoaded = '[Ingredient] Ingredient Already Loaded',
  SelectIngredientById = '[Ingredient] Select Ingredient By Id',
  AddIngredient = '[Ingredient] Add Ingredient',
  UpsertIngredient = '[Ingredient] Upsert Ingredient',
  AddIngredients = '[Ingredient] Add Ingredients',
  UpsertIngredients = '[Ingredient] Upsert Ingredients',
  UpdateIngredient = '[Ingredient] Update Ingredient',
  UpdateIngredientRequest = '[Edit Ingredient] Update Ingredient',
  UpdateIngredients = '[Ingredient] Update Ingredients',
  DeleteIngredient = '[Ingredient] Delete Ingredient',
  DeleteIngredients = '[Ingredient] Delete Ingredients',
  ClearIngredients = '[Ingredient] Clear Ingredients'
}

export class LoadIngredientsRequest implements Action {
  readonly type = IngredientActionTypes.LoadIngredientsRequest;
  constructor(public payload = null){}
}

export class LoadIngredientsRequestFail implements Action {
  readonly type = IngredientActionTypes.LoadIngredientsRequestFail;
  constructor(public payload: {error: string}){}
}

export class LoadIngredients implements Action {
  readonly type = IngredientActionTypes.LoadIngredients;
  constructor(public payload: {ingredients: Ingredient[]}){}
}

export class IngredientsAlreadyLoaded implements Action {
  readonly type = IngredientActionTypes.IngredientsAlreadyLoaded;
  constructor(public payload: null = null){}
}

export class LoadIngredientRequest implements Action {
  readonly type = IngredientActionTypes.LoadIngredientRequest;
  constructor(public payload: {id: number}){}
}

export class LoadIngredientRequestFail implements Action {
  readonly type = IngredientActionTypes.LoadIngredientRequestFail;
  constructor(public payload: {error: string}){}
}

export class LoadIngredient implements Action {
  readonly type = IngredientActionTypes.LoadIngredient;
  constructor(public payload: {ingredient: Ingredient}){}
}

export class IngredientAlreadyLoaded implements Action {
  readonly type = IngredientActionTypes.IngredientAlreadyLoaded;
  constructor(public payload: null = null){}
}

export class SelectIngredientById implements Action {
  readonly type = IngredientActionTypes.SelectIngredientById;
  constructor(public payload: {id: number}){}
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

export class UpdateIngredientRequest implements Action {
  readonly type = IngredientActionTypes.UpdateIngredientRequest;
  constructor(public payload: {ingredient: Ingredient}){}
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
LoadIngredientsRequest
| LoadIngredientsRequestFail
| LoadIngredients
| IngredientsAlreadyLoaded
| LoadIngredientRequest
| LoadIngredientRequestFail
| LoadIngredient
| IngredientAlreadyLoaded
| SelectIngredientById
| AddIngredient
| UpsertIngredient
| AddIngredients
| UpsertIngredients
| UpdateIngredient
| UpdateIngredientRequest
| UpdateIngredients
| DeleteIngredient
| DeleteIngredients
| ClearIngredients;
