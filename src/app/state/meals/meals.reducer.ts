import { Meal } from '../../interfaces/meal.interface';
import { MealsActions, MealsActionTypes } from './meals.actions';
import { createSelector } from '@ngrx/store';
import { ApplicationState } from '../app.state';

export interface MealsState {
    entities: {[key: number]: Meal};
    selectedMealId: string | null;
    loaded: boolean;
}

const INITIAL_STATE: MealsState = {
    entities: {},
    selectedMealId: undefined,
    loaded: false
}

export function mealsReducer(state: MealsState = INITIAL_STATE, action: MealsActions) {
    switch (action.type) {
        case MealsActionTypes.LOAD_MEALS_SUCCESS:
            const mealEntities = action.payload.reduce(
                (entities, meal) => {

                    /*
                        TODO: Check to be sure that spread is what we want here.
                        We may need to use _.cloneDeep due to nested objects.
                    */
                  return { ...entities, [meal.id]: meal };
                },
                { ...state.entities }
              );
        
              return {
                ...state,
                loaded: true,
                entities: mealEntities
              };
        case MealsActionTypes.SELECT_MEAL:
            return {
                ...state,
                selectedMealId: action.payload
            }
        case MealsActionTypes.UPDATE_MEAL_SUCCESS:
            return {
                ...state,
                entities: { ...state.entities, [action.payload.id]: action.payload }
            };
        case MealsActionTypes.ADD_MEAL:
            const inStore = state.entities[action.payload.id];
     
            if (inStore) {
              return state;
            }
      
            return {
              ...state,
              entities: { ...state.entities, [action.payload.id]: action.payload }
            };
        default:
            return state;
    }
}

// Selectors / Queries ######################################
 
 export namespace MealsQuery {
    export const getMealsEntities = (state: ApplicationState) => state.meals.entities;
    export const getLoaded = (state: ApplicationState) => state.meals.loaded;
    export const getSelectedMealId = (state: ApplicationState) => state.meals.selectedMealId;
  
    export const getMeals = createSelector(getMealsEntities, entities => {
      return Object.keys(entities).map(id => entities[id]);
    });
  
    export const getSelectedMeal = createSelector(getMealsEntities, getSelectedMealId, (mealEntities, id) => {
      return mealEntities[id];
    });
  }