import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IngredientQuantity } from './ingredient-quantity.model';
import { IngredientQuantityActions, IngredientQuantityActionTypes } from './ingredient-quantity.actions';
import { createFeatureSelector, Action, createSelector } from '@ngrx/store';
import { ApplicationState } from '@app/state/app.state';

export interface IngredientQuantityState {
  ids: string[];
  entities: {[id: string]: IngredientQuantity};
  selectedIngredientQuantityId: string | null;
  loaded: boolean;
}

const INITIAL_STATE: IngredientQuantityState = {
  ids: [],
  entities: {},
  selectedIngredientQuantityId: undefined,
  loaded: false,
}


export function ingredientQuantityReducer (state = INITIAL_STATE, action: IngredientQuantityActions) {
  switch (action.type) {
    case IngredientQuantityActionTypes.LOAD_INGREDIENT_QUANTITIES_SUCCESS:
            const ingredientQuantityEntities = action.payload.reduce(
                (entities, ingredientQuantity) => {
                  return { ...entities, [ingredientQuantity.id]: ingredientQuantity };
                },
                { ...state.entities }
              );
        
              return {
                ...state,
                loaded: true,
                entities: ingredientQuantityEntities
              };
    case IngredientQuantityActionTypes.ADD_INGREDIENT_QUANTITY:
    return {
        ...state,
        selectedIngredientQuantityId: action.payload
    }

    default: {
      return state;
    }
  }
}

// Selectors / Queries ######################################
 
export namespace IngredientQuantityQuery {
  export const getIngredientQuantityEntities = (state: ApplicationState) => state.ingredientQuantities.entities;
  export const getLoaded = (state: ApplicationState) => state.ingredientQuantities.loaded;
  export const getSelectedIngredientQuantityId = (state: ApplicationState) => state.ingredientQuantities.selectedIngredientQuantityId;

  export const getIngredientQuantities = createSelector(getIngredientQuantityEntities, entities => {
    return Object.keys(entities).map(id => entities[id]);
  });

  export const getSelectedIngredientQuantity = createSelector(getIngredientQuantityEntities, getSelectedIngredientQuantityId, (ingredientQuantityEntities, id) => {
    return ingredientQuantityEntities[id];
  });
}