import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Meal } from '../models/meal.model';
import { MealActions, MealActionTypes } from '../actions/meal.actions';

export interface State extends EntityState<Meal> {
  selectedMealId: number | null;
}

export const adapter: EntityAdapter<Meal> = createEntityAdapter<Meal>({
  selectId: (meal: Meal) => meal.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
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

export const getSelectedId = (state: State) => state.selectedMealId;

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
