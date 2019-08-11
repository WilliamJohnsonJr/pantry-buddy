import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IngredientQuantity } from './ingredient-quantity.model';

export enum IngredientQuantityActionTypes {
  HttpGETIngredientQuantities = '[IngredientQuantity] HttpGET IngredientQuantities',
  HttpGETIngredientQuantitiesSuccess = '[IngredientQuantity] HttpGET IngredientQuantitiesSuccess',
  AddIngredientQuantity = '[IngredientQuantity] Add IngredientQuantity',
  UpsertIngredientQuantity = '[IngredientQuantity] Upsert IngredientQuantity',
  AddIngredientQuantities = '[IngredientQuantity] Add IngredientQuantities',
  UpsertIngredientQuantities = '[IngredientQuantity] Upsert IngredientQuantities',
  UpdateIngredientQuantity = '[IngredientQuantity] Update IngredientQuantity',
  UpdateIngredientQuantities = '[IngredientQuantity] Update IngredientQuantities',
  DeleteIngredientQuantity = '[IngredientQuantity] Delete IngredientQuantity',
  DeleteIngredientQuantities = '[IngredientQuantity] Delete IngredientQuantities',
  ClearIngredientQuantities = '[IngredientQuantity] Clear IngredientQuantities'
}

export class HttpGETIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.HttpGETIngredientQuantities;

  constructor() {}
}

export class HttpGETIngredientQuantitiesSuccess implements Action {
  readonly type = IngredientQuantityActionTypes.HttpGETIngredientQuantitiesSuccess;

  constructor(public payload: { ingredientQuantities: IngredientQuantity[] }) {}
}

export class AddIngredientQuantity implements Action {
  readonly type = IngredientQuantityActionTypes.AddIngredientQuantity;

  constructor(public payload: { ingredientQuantity: IngredientQuantity }) {}
}

export class UpsertIngredientQuantity implements Action {
  readonly type = IngredientQuantityActionTypes.UpsertIngredientQuantity;

  constructor(public payload: { ingredientQuantity: IngredientQuantity }) {}
}

export class AddIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.AddIngredientQuantities;

  constructor(public payload: { ingredientQuantities: IngredientQuantity[] }) {}
}

export class UpsertIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.UpsertIngredientQuantities;

  constructor(public payload: { ingredientQuantities: IngredientQuantity[] }) {}
}

export class UpdateIngredientQuantity implements Action {
  readonly type = IngredientQuantityActionTypes.UpdateIngredientQuantity;

  constructor(public payload: { ingredientQuantity: Update<IngredientQuantity> }) {}
}

export class UpdateIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.UpdateIngredientQuantities;

  constructor(public payload: { ingredientQuantities: Update<IngredientQuantity>[] }) {}
}

export class DeleteIngredientQuantity implements Action {
  readonly type = IngredientQuantityActionTypes.DeleteIngredientQuantity;

  constructor(public payload: { id: string }) {}
}

export class DeleteIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.DeleteIngredientQuantities;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.ClearIngredientQuantities;
}

export type IngredientQuantityActions =
 HttpGETIngredientQuantities
 | HttpGETIngredientQuantitiesSuccess
 | AddIngredientQuantity
 | UpsertIngredientQuantity
 | AddIngredientQuantities
 | UpsertIngredientQuantities
 | UpdateIngredientQuantity
 | UpdateIngredientQuantities
 | DeleteIngredientQuantity
 | DeleteIngredientQuantities
 | ClearIngredientQuantities;
