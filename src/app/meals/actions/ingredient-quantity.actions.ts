import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IngredientQuantity } from '@app/meals/models/ingredient-quantity.model';

export enum IngredientQuantityActionTypes {
  LoadIngredientQuantities = '[IngredientQuantity] Load IngredientQuantities',
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

export class LoadIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.LoadIngredientQuantities;

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
 LoadIngredientQuantities
 | AddIngredientQuantity
 | UpsertIngredientQuantity
 | AddIngredientQuantities
 | UpsertIngredientQuantities
 | UpdateIngredientQuantity
 | UpdateIngredientQuantities
 | DeleteIngredientQuantity
 | DeleteIngredientQuantities
 | ClearIngredientQuantities;
