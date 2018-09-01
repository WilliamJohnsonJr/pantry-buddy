import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Ingredient } from '../models/ingredient.model';
import { IngredientActions, IngredientActionTypes } from '../actions/ingredient.actions';

export interface State extends EntityState<Ingredient> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Ingredient> = createEntityAdapter<Ingredient>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: IngredientActions
): State {
  switch (action.type) {
    case IngredientActionTypes.AddIngredient: {
      return adapter.addOne(action.payload.ingredient, state);
    }

    case IngredientActionTypes.UpsertIngredient: {
      return adapter.upsertOne(action.payload.ingredient, state);
    }

    case IngredientActionTypes.AddIngredients: {
      return adapter.addMany(action.payload.ingredients, state);
    }

    case IngredientActionTypes.UpsertIngredients: {
      return adapter.upsertMany(action.payload.ingredients, state);
    }

    case IngredientActionTypes.UpdateIngredient: {
      return adapter.updateOne(action.payload.ingredient, state);
    }

    case IngredientActionTypes.UpdateIngredients: {
      return adapter.updateMany(action.payload.ingredients, state);
    }

    case IngredientActionTypes.DeleteIngredient: {
      return adapter.removeOne(action.payload.id, state);
    }

    case IngredientActionTypes.DeleteIngredients: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case IngredientActionTypes.LoadIngredients: {
      return adapter.addAll(action.payload.ingredients, state);
    }

    case IngredientActionTypes.ClearIngredients: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
