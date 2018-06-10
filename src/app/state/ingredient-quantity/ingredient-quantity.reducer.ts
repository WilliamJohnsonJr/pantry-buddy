import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IngredientQuantity } from './ingredient-quantity.model';
import { IngredientQuantityActions, IngredientQuantityActionTypes } from './ingredient-quantity.actions';

export interface State extends EntityState<IngredientQuantity> {
  // additional entities state properties
  loaded: boolean;
  loading: boolean;
  selectedIngredientQuantityId: string;
}

export const adapter: EntityAdapter<IngredientQuantity> = createEntityAdapter<IngredientQuantity>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
  selectedIngredientQuantityId: null
});

export function reducer(
  state = initialState,
  action: IngredientQuantityActions
): State {
  switch (action.type) {
    case IngredientQuantityActionTypes.AddIngredientQuantity: {
      return adapter.addOne(action.payload.ingredientQuantity, state);
    }

    case IngredientQuantityActionTypes.UpsertIngredientQuantity: {
      return adapter.upsertOne(action.payload.ingredientQuantity, state);
    }

    case IngredientQuantityActionTypes.AddIngredientQuantities: {
      return adapter.addMany(action.payload.ingredientQuantities, state);
    }

    case IngredientQuantityActionTypes.UpsertIngredientQuantities: {
      return adapter.upsertMany(action.payload.ingredientQuantities, state);
    }

    case IngredientQuantityActionTypes.UpdateIngredientQuantity: {
      return adapter.updateOne(action.payload.ingredientQuantity, state);
    }

    case IngredientQuantityActionTypes.UpdateIngredientQuantities: {
      return adapter.updateMany(action.payload.ingredientQuantities, state);
    }

    case IngredientQuantityActionTypes.DeleteIngredientQuantity: {
      return adapter.removeOne(action.payload.id, state);
    }

    case IngredientQuantityActionTypes.DeleteIngredientQuantities: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case IngredientQuantityActionTypes.LoadIngredientQuantities: {
      return adapter.addAll(action.payload.ingredientQuantities, state);
    }

    case IngredientQuantityActionTypes.ClearIngredientQuantities: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedIngredientQuantityId = (state: State) => state.selectedIngredientQuantityId;
export const getIngredientQuantitiesLoaded = (state: State) => state.loaded;
export const getIngredientQuantitiesLoading = (state: State) => state.loading;

export const {
  selectIds: selectIngredientQuantityIds,
  selectEntities: selectIngredientQuantityEntities,
  selectAll: selectAllIngredientQuantities,
  selectTotal: selectIngredientQuantityTotal,
} = adapter.getSelectors();
