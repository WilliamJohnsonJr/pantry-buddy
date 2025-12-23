/**
 * // This code adapted from the NgRx Example App at https://github.com/ngrx/platform/blob/master/example-app/ under the following license:
 **/

import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
    MemoizedSelector,
  } from '@ngrx/store';
  import * as fromMeals from '@app/meals/reducers/meal.reducer';
  import * as fromIngredientQuantities from '@app/meals/reducers/ingredient-quantity.reducer';
  import * as fromIngredients from '@app/meals/reducers/ingredient.reducer';
  import * as fromRoot from '@app/reducers';
import { Meal } from '../models/meal.model';
import { IngredientQuantity } from '../models/ingredient-quantity.model';
import { Ingredient } from '../models/ingredient.model';

  export interface MealsState {
    meals: fromMeals.State;
    ingredientQuantities: fromIngredientQuantities.State;
    ingredients: fromIngredients.State;
  }

  export interface State extends fromRoot.State {
    meals: MealsState;
  }

  export const reducers: ActionReducerMap<MealsState> = {
    meals: fromMeals.reducer,
    ingredientQuantities: fromIngredientQuantities.reducer,
    ingredients: fromIngredients.reducer
  };

  /**
   * A selector function is a map function factory. We pass it parameters and it
   * returns a function that maps from the larger state tree into a smaller
   * piece of state. This selector simply selects the `meals` state.
   *
   * Selectors are used with the `select` operator.
   *
   * ```ts
   * class MyComponent {
   *   constructor(state$: Observable<State>) {
   *     this.mealsState$ = state$.pipe(select(getMealsState));
   *   }
   * }
   * ```
   */

  /**
   * The createFeatureSelector function selects a piece of state from the root of the state object.
   * This is used for selecting feature states that are loaded eagerly or lazily.
   */
  export const getMealsState:
   MemoizedSelector<State, MealsState> = createFeatureSelector<State, MealsState>('meals');

  /**
   * Every reducer module exports selector functions, however child reducers
   * have no knowledge of the overall state tree. To make them usable, we
   * need to make new selectors that wrap them.
   *
   * The createSelector function creates very efficient selectors that are memoized and
   * only recompute when arguments change. The created selectors can also be composed
   * together to select different pieces of state.
   */
  export const getMealEntitiesState: MemoizedSelector<State, fromMeals.State> = createSelector(
    getMealsState,
    state => state.meals
  );

  export const getIngredientQuantityEntitiesState: MemoizedSelector<State, fromIngredientQuantities.State> = createSelector(
    getMealsState,
    state => state.ingredientQuantities
  )

  export const getIngredientEntitiesState: MemoizedSelector<State, fromIngredients.State> = createSelector(
    getMealsState,
    state => state.ingredients
  )

  export const getSelectedMealId: MemoizedSelector<State, number> = createSelector(
    getMealEntitiesState,
    fromMeals.getSelectedId
  );

  export const getMealsLoading: MemoizedSelector<State, boolean> = createSelector(
    getMealEntitiesState,
    fromMeals.getLoading
  )

  export const getAllMealsLoadedParentSelector: MemoizedSelector<State, boolean> = createSelector(
    getMealEntitiesState,
    fromMeals.getAllMealsLoaded
  )

  export const getSelectedMealIdParentSelector: MemoizedSelector<State, number> = createSelector(
    getMealEntitiesState,
    fromMeals.getSelectedId
  )

  export const getSelectedMealParentSelector: MemoizedSelector<State, MemoizedSelector<fromMeals.State, Meal>> = createSelector(
    getMealEntitiesState,
    fromMeals.getSelectedMeal
  )

  export const getSelectedMealLoadedParentSelector: MemoizedSelector<State, boolean> = createSelector(
    getMealEntitiesState,
    fromMeals.getSelectedMealLoaded
  )

  export const getSelectedIngredientId: MemoizedSelector<State, number> = createSelector(
    getIngredientEntitiesState,
    fromIngredients.getSelectedId
  )

  export const getAllIngredientsLoadedParentSelector: MemoizedSelector<State, boolean> = createSelector(
    getIngredientEntitiesState,
    fromIngredients.getAllIngredientsLoaded
  )

  export const getIngredientsLoading: MemoizedSelector<State, boolean> = createSelector(
    getIngredientEntitiesState,
    fromIngredients.getLoading
  )

  /**
   * Adapters created with @ngrx/entity generate
   * commonly used selector functions including
   * getting all ids in the record set, a dictionary
   * of the records by id, an array of records and
   * the total number of records. This reduces boilerplate
   * in selecting records from the entity state.
   */
  export const {
    selectIds: getMealIds,
    selectEntities: getMealEntities,
    selectAll: getAllMeals,
    selectTotal: getTotalMeals,
  } = fromMeals.adapter.getSelectors(getMealEntitiesState);

  export const getSelectedMeal: MemoizedSelector<State, Meal> = createSelector(
    getMealEntities,
    getSelectedMealId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
  );

  export const {
    selectIds: getIngredientQuantityIds,
    selectEntities: getIngredientQuantityEntities,
    selectAll: getAllIngredientQuantities,
    selectTotal: getTotalIngredientQuantities
  } = fromIngredientQuantities.adapter.getSelectors(getIngredientQuantityEntitiesState);

  export const getIngredientQuantitiesForSelectedMeal: MemoizedSelector<State, IngredientQuantity[]> = createSelector(
    getIngredientQuantityEntities,
    getSelectedMealId,
    (ingredientQuantities, selectedMealId) => {
      return Object.keys(ingredientQuantities).map(id => ingredientQuantities[id]).filter(entity => entity.mealId === selectedMealId);
    }
  )

  export const {
    selectIds: getIngredientIds,
    selectEntities: getIngredientEntities,
    selectAll: getAllIngredients,
    selectTotal: getTotalIngredients
  } = fromIngredients.adapter.getSelectors(getIngredientEntitiesState);

  export const getIngredientsForSelectedMeal: MemoizedSelector<State, Ingredient[]> = createSelector(
    getIngredientEntities,
    getIngredientQuantitiesForSelectedMeal,
    (ingredients, ingredientQuantities) => {
      return ingredientQuantities
        .map(ingredientQuantity => ingredients[ingredientQuantity.ingredientId])
    }
  )


  /**
   * Some selector functions create joins across parts of state. This selector
   * composes the search result IDs to return an array of meals in the store.
   */
//   export const getSearchResults = createSelector(
//     getMealEntities,
//     getSearchMealIds,
//     (meals, searchIds) => {
//       return searchIds.map(id => meals[id]);
//     }
//   );

//   export const getCollectionState = createSelector(
//     getMealsState,
//     (state: MealsState) => state.collection
//   );

  export const isSelectedMealInList: MemoizedSelector<State, boolean> = createSelector(
    getMealIds,
    getSelectedMealId,
    (ids: Array<number>, selected) => {
        return (ids.indexOf(selected) > -1);
    }
  );

  export const isSelectedIngredientInList: MemoizedSelector<State, boolean> = createSelector(
    getIngredientIds,
    getSelectedIngredientId,
    (ids: Array<number>, selected) => {
        return (ids.indexOf(selected) > -1);
    }
  );
