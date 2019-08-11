import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap } from '@ngrx/store';
import * as fromIngredient from '@state/ingredient/ingredient.reducer';
import * as fromIngredientQuantity from '@state/ingredient-quantity/ingredient-quantity.reducer';
import * as fromMeal from '@state/meal/meal.reducer';
import { IngredientQuantity } from '../ingredient-quantity/ingredient-quantity.model';

export interface State {
    meal: fromMeal.State,
    ingredient: fromIngredient.State,
    IngredientQuantity: fromIngredientQuantity.State
}

export const reducers: ActionReducerMap<any> = {
    meal: fromMeal.reducer,
    ingredient: fromIngredient.reducer,
    ingredientQuantity: fromIngredientQuantity.reducer

}

export const selectMealState = createFeatureSelector<fromMeal.State>('meal'); // string here corresponds to key in reducers object

export const selectMealIds = createSelector(
    selectMealState,
    fromMeal.selectMealIds
  );
  export const selectMealEntities = createSelector(
    selectMealState,
    fromMeal.selectMealEntities
  );

  export const getMealsLoaded = createSelector(
    selectMealState,
    fromMeal.selectMealsLoaded
  )

  export const selectAllMeals = createSelector(
    selectMealState,
    fromMeal.selectAllMeals
  );
  export const selectMealTotal = createSelector(
    selectMealState,
    fromMeal.selectMealTotal
  );
  export const selectCurrentMealId = createSelector(
    selectMealState,
    fromMeal.getSelectedMealId
  );
  
  export const selectCurrentMeal = createSelector(
    selectMealEntities,
    selectCurrentMealId,
    (mealEntities, mealId) => mealEntities[mealId]
  );

  export const selectIngredientQuantityState = createFeatureSelector<fromIngredientQuantity.State>('ingredientQuantity'); // string here corresponds to key in reducers object

export const selectIngredientQuantityIds = createSelector(
    selectIngredientQuantityState,
    fromIngredientQuantity.selectIngredientQuantityIds
  );
  export const selectIngredientQuantityEntities = createSelector(
    selectIngredientQuantityState,
    fromIngredientQuantity.selectIngredientQuantityEntities
  );
  export const selectAllIngredientQuantities = createSelector(
    selectIngredientQuantityState,
    fromIngredientQuantity.selectAllIngredientQuantities
  );

  export const selectIngredientQuantitiesBySelectedMeal = createSelector(
    selectCurrentMeal,
    selectAllIngredientQuantities, (meal, ingredientQuantities) => {
      return ingredientQuantities
        .filter((ingredientQuantity: IngredientQuantity) => meal
          .ingredientQuantities.indexOf(ingredientQuantity.id) > -1);
    }
  )

  export const selectIngredientQuantityTotal = createSelector(
    selectIngredientQuantityState,
    fromIngredientQuantity.selectIngredientQuantityTotal
  );
  export const selectCurrentIngredientQuantityId = createSelector(
    selectIngredientQuantityState,
    fromIngredientQuantity.getSelectedIngredientQuantityId
  );
  
  export const selectCurrentIngredientQuantity = createSelector(
    selectIngredientQuantityEntities,
    selectCurrentIngredientQuantityId,
    (mealEntities, mealId) => mealEntities[mealId]
  );

  export const selectIngredientState = createFeatureSelector<fromIngredientQuantity.State>('ingredient'); // string here corresponds to key in reducers object

  export const selectAllIngredients = createSelector (
    selectIngredientState,
    fromIngredient.selectAll
  )

  export const selectIngredientEntities = createSelector (
    selectIngredientState,
    fromIngredient.selectEntities
  )