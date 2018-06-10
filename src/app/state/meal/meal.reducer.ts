import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Meal } from './meal.model';
import { MealActions, MealActionTypes, LoadMealsSuccess } from './meal.actions';

export interface State extends EntityState<Meal> {
  // additional entities state properties
  loaded: boolean;
  loading: boolean;
  selectedMealId: string;
}

export const adapter: EntityAdapter<Meal> = createEntityAdapter<Meal>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
  selectedMealId: null
});

export function reducer(
  state = initialState,
  action: MealActions
): State {
  switch (action.type) {
    case MealActionTypes.AddMeal: {
      return adapter.addOne(action.payload.meal, state);
    }

    case MealActionTypes.UpsertMeal: {
      return adapter.upsertOne(action.payload.meal, state);
    }

    case MealActionTypes.AddMeals: {
      return adapter.addMany(action.payload.meals, state);
    }

    case MealActionTypes.UpsertMeals: {
      return adapter.upsertMany(action.payload.meals, state);
    }

    case MealActionTypes.UpdateMeal: {
      return adapter.updateOne(action.payload.meal, state);
    }

    case MealActionTypes.UpdateMeals: {
      return adapter.updateMany(action.payload.meals, state);
    }

    case MealActionTypes.DeleteMeal: {
      return adapter.removeOne(action.payload.id, state);
    }

    case MealActionTypes.DeleteMeals: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case MealActionTypes.LoadMeals: {
      return {
        ...state, loaded: false, loading: true
      }
    }

    case MealActionTypes.LoadMealsSuccess: {
      return adapter.addAll(action.payload.meals, {...state, loaded: true, loading: false});
    }

    case MealActionTypes.ClearMeals: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedMealId = (state: State) => state.selectedMealId;
export const getMealsLoaded = (state: State) => state.loaded;
export const getMealsLoading = (state: State) => state.loading;

export const {
  selectIds: selectMealIds,
  selectEntities: selectMealEntities,
  selectAll: selectAllMeals,
  selectTotal: selectMealTotal,
} = adapter.getSelectors();
