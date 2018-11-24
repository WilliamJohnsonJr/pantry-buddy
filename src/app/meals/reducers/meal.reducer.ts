import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Meal } from '@app/meals/models/meal.model';
import { MealActions, MealActionTypes } from '@app/meals/actions/meal.actions';
import { createSelector } from '@ngrx/store';

export interface State extends EntityState<Meal> {
  selectedMealId: number | null;
  selectedMealLoaded: boolean;
  allMealsLoaded: boolean;
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Meal> = createEntityAdapter<Meal>({
  selectId: (meal: Meal) => meal.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedMealId: null,
  selectedMealLoaded: false,
  allMealsLoaded: false,
  loading: false,
  submitting: false,
  error: null
});

export function reducer(
  state = initialState,
  action: MealActions
): State {
  switch (action.type) {

    case MealActionTypes.LoadMealsRequest: {
      return {
        ...state,
        loading: true
      }
    }

    case MealActionTypes.LoadMealsRequestFail: {
      return {
        ...state,
        loading: false,
        allMealsLoaded: false,
        error: action.payload.error
      }
    }

    case MealActionTypes.MealsAlreadyLoaded: {
      return {
        ...state,
        loading: false,
        allMealsLoaded: true
      }
    }

    case MealActionTypes.LoadMealRequest: {
      return {
        ...state,
        loading: true,
      }
    }

    case MealActionTypes.LoadMealRequestFail: {
      return {
        ...state,
        loading: false,
        selectedMealLoaded: false,
        selectedMealId: null,
        error: action.payload.error
      }
    }

    case MealActionTypes.MealAlreadyLoaded: {
      return {
        ...state,
        loading: false,
        selectedMealLoaded: true
      }
    }

    case MealActionTypes.AddMeal: {
      return adapter.addOne(action.payload.meal, {...state,
        selectedMealLoaded: true,
        loading: false
      });
    }

    case MealActionTypes.SelectMealById: {
      return {
        ...state,
        selectedMealId: action.payload.id
      }
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

    case MealActionTypes.UpdateMealRequest: {
      return {
        ...state,
        submitting: true
      }
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
      return adapter.addAll(action.payload.meals, {...state,
        allMealsLoaded: true,
        loading: false
      });
    }

    case MealActionTypes.ClearMeals: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getAllMealsLoaded = (state: State) => state.allMealsLoaded;

export const getSelectedMealLoaded = (state: State) => state.selectedMealLoaded;

export const getSelectedMeal = (state: State) => createSelector(
  selectEntities,
  getSelectedId,
  (entities, id) => {return entities[id]}
)

export const getLoading = (state: State) => state.loading;

export const getSelectedId = (state: State) => state.selectedMealId;

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
