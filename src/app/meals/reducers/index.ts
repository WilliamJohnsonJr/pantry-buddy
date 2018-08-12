import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromMeals from './meal.reducer';
  import * as fromRoot from '../../reducers';
  
  export interface MealsState {
    meals: fromMeals.State;
  }
  
  export interface State extends fromRoot.State {
    meals: MealsState;
  }
  
  export const reducers: ActionReducerMap<MealsState> = {
    meals: fromMeals.reducer,
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
  export const getMealsState = createFeatureSelector<State, MealsState>('meals');
  
  /**
   * Every reducer module exports selector functions, however child reducers
   * have no knowledge of the overall state tree. To make them usable, we
   * need to make new selectors that wrap them.
   *
   * The createSelector function creates very efficient selectors that are memoized and
   * only recompute when arguments change. The created selectors can also be composed
   * together to select different pieces of state.
   */
  export const getMealEntitiesState = createSelector(
    getMealsState,
    state => state.meals
  );
  
  export const getSelectedMealId = createSelector(
    getMealEntitiesState,
    fromMeals.getSelectedId
  );
  
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
  
  export const getSelectedMeal = createSelector(
    getMealEntities,
    getSelectedMealId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
  );
  
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
  
//   export const getCollectionLoaded = createSelector(
//     getCollectionState,
//     fromCollection.getLoaded
//   );
//   export const getCollectionLoading = createSelector(
//     getCollectionState,
//     fromCollection.getLoading
//   );
//   export const getCollectionMealIds = createSelector(
//     getCollectionState,
//     fromCollection.getIds
//   );
  
//   export const getMealCollection = createSelector(
//     getMealEntities,
//     getCollectionMealIds,
//     (entities, ids) => {
//       return ids.map(id => entities[id]);
//     }
//   );
  
  export const isSelectedMealInList = createSelector(
    getMealIds,
    getSelectedMealId,
    (ids, selected) => {
      return ids.indexOf(selected) > -1;
    }
  );