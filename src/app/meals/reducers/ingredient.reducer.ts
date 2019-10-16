import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Ingredient } from '../models/ingredient.model';
import { IngredientActions, IngredientActionTypes } from '../actions/ingredient.actions';
import { createSelector, MemoizedSelector } from '@ngrx/store';

export interface State extends EntityState<Ingredient> {
  // additional entities state properties  
  selectedIngredientId: number;
  selectedIngredientLoaded: boolean;
  allIngredientsLoaded: boolean;
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Ingredient> = createEntityAdapter<Ingredient>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedIngredientId: null,
  selectedIngredientLoaded: false,
  allIngredientsLoaded: false,
  loading: false,
  submitting: false,
  error: null,
});

export function reducer(
  state = initialState,
  action: IngredientActions
): State {
  switch (action.type) {

    case IngredientActionTypes.LoadIngredientsRequest: {
      return {
        ...state,
        loading: true
      }
    }

    case IngredientActionTypes.LoadIngredientsRequestFail: {
      return {
        ...state,
        loading: false,
        allIngredientsLoaded: false,
        error: action.payload.error
      }
    }

    case IngredientActionTypes.IngredientsAlreadyLoaded: {
      return {
        ...state,
        loading: false,
        allIngredientsLoaded: true
      }
    }

    case IngredientActionTypes.LoadIngredientRequest: {
      return {
        ...state,
        loading: true,
      }
    }

    case IngredientActionTypes.LoadIngredientRequestFail: {
      return {
        ...state,
        loading: false,
        selectedIngredientLoaded: false,
        selectedIngredientId: null,
        error: action.payload.error
      }
    }

    case IngredientActionTypes.IngredientAlreadyLoaded: {
      return {
        ...state,
        loading: false,
        selectedIngredientLoaded: true
      }
    }

    case IngredientActionTypes.AddIngredient: {
      return adapter.addOne(action.payload.ingredient, {...state,
        selectedIngredientLoaded: true,
        loading: false
      });
    }

    case IngredientActionTypes.SelectIngredientById: {
      return {
        ...state,
        selectedIngredientId: action.payload.id
      }
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

    case IngredientActionTypes.UpdateIngredientRequest: {
      return {
        ...state,
        submitting: true
      }
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
      return adapter.addAll(action.payload.ingredients, {...state,
        allIngredientsLoaded: true,
        loading: false
      });
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

export const getLoading = (state: State) => state.loading;

export const getAllIngredientsLoaded: (state: State) => boolean = (state: State): boolean => state.allIngredientsLoaded;

export const getSelectedIngredientLoaded: (state: State) => boolean = (state: State) => state.selectedIngredientLoaded;

export const getSelectedId = (state: State) => state.selectedIngredientId;

export const getSelectedIngredient: MemoizedSelector<EntityState<Ingredient>, Ingredient> = createSelector(
  selectEntities,
  getSelectedId,
  (entities, id) => {return entities[id]}
)






