import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IngredientQuantity } from './ingredient-quantity.model';

export enum IngredientQuantityActionTypes {
  LOAD_INGREDIENT_QUANTITIES = '[IngredientQuantity] Load IngredientQuantities',
  LOAD_INGREDIENT_QUANTITIES_SUCCESS = '[IngredientQuantity] Load IngredientQuantities Success',
  ADD_INGREDIENT_QUANTITY = '[IngredientQuantity] Add IngredientQuantity',
  UPSERT_INGREDIENT_QUANTITY = '[IngredientQuantity] Upsert IngredientQuantity',
  ADD_INGREDIENT_QUANTITIES = '[IngredientQuantity] Add IngredientQuantities',
  UPSERT_INGREDIENT_QUANTITIES = '[IngredientQuantity] Upsert IngredientQuantities',
  UPDATE_INGREDIENT_QUANTITY = '[IngredientQuantity] Update IngredientQuantity',
  UPDATE_INGREDIENT_QUANTITY_SUCCESS = '[IngredientQuantity] Update IngredientQuantity Success',
  UPDATE_INGREDIENT_QUANTITIES = '[IngredientQuantity] Update IngredientQuantities',
  DELETE_INGREDIENT_QUANTITY = '[IngredientQuantity] Delete IngredientQuantity',
  DELETE_INGREDIENT_QUANTITIES = '[IngredientQuantity] Delete IngredientQuantities',
  CLEAR_INGREDIENT_QUANTITIES = '[IngredientQuantity] Clear IngredientQuantities'
}

export class LoadIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.LOAD_INGREDIENT_QUANTITIES;
  constructor(public payload = null) {}
}

export class LoadIngredientQuantitiesSuccess implements Action {
  readonly type = IngredientQuantityActionTypes.LOAD_INGREDIENT_QUANTITIES_SUCCESS;
  constructor(public payload: IngredientQuantity[]){}
}

export class AddIngredientQuantity implements Action {
  readonly type = IngredientQuantityActionTypes.ADD_INGREDIENT_QUANTITY;
  constructor(public payload:  IngredientQuantity ) {}
}

export class AddIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.ADD_INGREDIENT_QUANTITIES;
  constructor(public payload: IngredientQuantity[]) {}
}

export class UpdateIngredientQuantity implements Action {
  readonly type = IngredientQuantityActionTypes.UPDATE_INGREDIENT_QUANTITY;
  constructor(public payload: IngredientQuantity) {}
}

export class UpdateIngredientQuantitySuccess implements Action {
  readonly type = IngredientQuantityActionTypes.UPDATE_INGREDIENT_QUANTITY_SUCCESS;
  constructor(public payload: IngredientQuantity){}
}

export class UpdateIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.UPDATE_INGREDIENT_QUANTITIES;

  constructor(public payload: IngredientQuantity[]) {}
}

export class DeleteIngredientQuantity implements Action {
  readonly type = IngredientQuantityActionTypes.DELETE_INGREDIENT_QUANTITY;

  constructor(public payload: string) {}
}

export class DeleteIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.DELETE_INGREDIENT_QUANTITIES;

  constructor(public payload: string[]) {}
}

export class ClearIngredientQuantities implements Action {
  readonly type = IngredientQuantityActionTypes.CLEAR_INGREDIENT_QUANTITIES;
  constructor(public payload = null){}
}

export type IngredientQuantityActions =
 LoadIngredientQuantities
 | LoadIngredientQuantitiesSuccess
 | AddIngredientQuantity
 | AddIngredientQuantities
 | UpdateIngredientQuantity
 | UpdateIngredientQuantitySuccess
 | UpdateIngredientQuantities
 | DeleteIngredientQuantity
 | DeleteIngredientQuantities
 | ClearIngredientQuantities;
