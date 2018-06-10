import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Meal } from './meal.model';
import { MealActions, MealActionTypes, LoadMealsSuccess, SelectMeal } from './meal.actions';
import { Action } from '@ngrx/store';

export interface State extends EntityState<Meal> {
  // additional entities state properties
  selectedMealId: string;
}

export const adapter: EntityAdapter<Meal> = createEntityAdapter<Meal>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
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

    case MealActionTypes.SelectMeal: {
      return {...state, selectedMealId: action.payload}
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
      return {...state}
    }

    case MealActionTypes.LoadMealsSuccess: {
      return adapter.addAll(action.payload.meals, state);
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

export const {
  selectIds: selectMealIds,
  selectEntities: selectMealEntities,
  selectAll: selectAllMeals,
  selectTotal: selectMealTotal,
} = adapter.getSelectors();
