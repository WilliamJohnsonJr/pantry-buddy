import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, combineLatest } from 'rxjs';
import { map, switchMap, mergeMap, toArray } from 'rxjs/operators';

import { BASE_API_ENDPOINT } from '@app/app.tokens';
import { Meal } from '@app/meals/models/meal.model';
import { MealHttp } from '@app/meals/models/meal-http.model';
import { mealsSchema, mealSchema } from '@app/meals/schemas/meal-schemas';
import { normalize, denormalize } from 'normalizr';
import { IngredientQuantity } from '@app/meals/models/ingredient-quantity.model';
import { Ingredient } from '../models/ingredient.model';
import { IngredientQuantityHttp } from '../models/ingredient-quantity-http.model';
import { Store, select } from '@ngrx/store';
import * as fromMeals from '@app/meals/reducers';
import * as fromIngredientQuantities from '@app/meals/reducers/ingredient-quantity.reducer';
import {Noop} from '@app/core/actions/util.actions';
import * as fromIngredients from '@app/meals/reducers/ingredient.reducer';
import { getIngredientEntitiesState } from '../reducers/index';
import { IngredientQuantityActionTypes, UpsertIngredientQuantities } from '../actions/ingredient-quantity.actions';
import { IngredientQuantityActions } from '@app/meals/actions/ingredient-quantity.actions';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_API_ENDPOINT) private baseApiEndpoint,
    private store: Store<fromMeals.State>){}

  getMeal(id: number): Observable<MealHttp> {
    return this.http.get<MealHttp>(`${this.baseApiEndpoint}meals/${id}`)
  }

  normalizeMeal = (mealHttp: MealHttp): {meal: Meal, ingredientQuantities: IngredientQuantity[], ingredients: Ingredient[]} => {
    // Normalizes data and returns normalized array rather than array of nested objects
    const normalizedData = normalize({meals: [mealHttp]}, mealsSchema);
    const mealDataArray = normalizedData.result.meals.map(id => normalizedData.entities.meals[id]);
    // We have to return an array to LoadIngredientQuantities action, so we run through the normalized
    // ingredientQuantities object using Object.keys and convert it to an array of IngredientQuantity objects.

    const ingredientQuantitiesDataArray = Object.keys(normalizedData.entities.ingredientQuantities)
    .map(key => normalizedData.entities.ingredientQuantities[key]).
    map(ingredientQuantity => {
      let clone: any = {...ingredientQuantity};
      delete clone.text;
      return clone; // prevents duplicate text property from entering data store
    });

    const ingredientsDataArray = Object.keys(normalizedData.entities.ingredientQuantities)
    .map(key => normalizedData.entities.ingredientQuantities[key])
    .map(ingredientQuantity => ({id: ingredientQuantity.ingredientId, text: ingredientQuantity.text}));

    return {meal: mealDataArray[0], ingredientQuantities: ingredientQuantitiesDataArray, ingredients: ingredientsDataArray};
  }

  getMeals(): Observable<MealHttp[]> {
    return this.http.get<MealHttp[]>(`${this.baseApiEndpoint}meals`);
  }

  normalizeMeals = (mealHttps: MealHttp[]): {meals: Meal[], ingredientQuantities: IngredientQuantity[], ingredients: Ingredient[]} => {
     // Normalizes data and returns normalized array rather than array of nested objects
     const normalizedData = normalize({meals: mealHttps}, mealsSchema);
     const mealsData = normalizedData.result.meals.map(id => normalizedData.entities.meals[id]);
     // We have to return an array to LoadIngredientQuantities action, so we run through the normalized
     // ingredientQuantities object using Object.keys and convert it to an array of IngredientQuantity objects.
     const ingredientQuantitiesData = Object.keys(normalizedData.entities.ingredientQuantities)
     .map(key => normalizedData.entities.ingredientQuantities[key])
     .map(ingredientQuantity => {
        let clone: any = {...ingredientQuantity};
        delete clone.text;
        return clone;  // prevents duplicate text property from entering data store
      });

    const ingredientsDataArray = Object.keys(normalizedData.entities.ingredientQuantities)
     .map(key => normalizedData.entities.ingredientQuantities[key])
     .map(ingredientQuantity => ({id: ingredientQuantity.ingredientId, text: ingredientQuantity.text}));

     return {meals: mealsData, ingredientQuantities: ingredientQuantitiesData, ingredients: ingredientsDataArray};
  }

  updateMeal(meal: Meal): Observable<Meal> {
    const mealId: number = meal.id;
    let denormalizedMeal: MealHttp;
    return combineLatest(
      [
      this.store.select(fromMeals.getIngredientQuantitiesForSelectedMeal),
      this.store.select(fromMeals.getAllIngredients),
      this.store.select(fromMeals.getSelectedMeal)
    ]).pipe(
      map(
        (res: any) => {
          const ingredientQuantities: IngredientQuantity[] = res[0];
          const ingredients: Ingredient[] = res[1];
          const selectedMeal: Meal = res[2];
          denormalizedMeal = {
            ...meal,
            ingredientQuantities: meal.ingredientQuantities.map(
              (ingredientQuantity: any) => {
                const ingredientQuantityHttp: IngredientQuantityHttp = {
                  ...ingredientQuantity,
                  text: ingredients.filter(ingredient => ingredient.id === ingredientQuantity.ingredientId)[0].text
                }
                
                return ingredientQuantityHttp;
              }
            )
          }
          return denormalizedMeal;
        }),
        switchMap(denormalizedMeal => {
          return combineLatest(denormalizedMeal.ingredientQuantities.map(iq => {
            return iq.id 
              ? this.http.put<IngredientQuantityHttp>(`${this.baseApiEndpoint}ingredientQuantities/${iq.id}`, iq)
              : this.http.post<IngredientQuantityHttp>(`${this.baseApiEndpoint}ingredientQuantities`, iq)
          }))
        }),
        switchMap((res: IngredientQuantityHttp[]) => {
          const existingIngredientQuantityIds: number[] = denormalizedMeal.ingredientQuantities.map(iq => iq.id);
          const ingredientQuantitiesToAdd: IngredientQuantityHttp[] = res
            .filter(item => existingIngredientQuantityIds.indexOf(item.id)<0);
          return ingredientQuantitiesToAdd;
        }),
        map((ingredientQuantitiesToAdd: IngredientQuantityHttp[]) => {
          let updatedIngredientQuantities: IngredientQuantityHttp[] = denormalizedMeal.ingredientQuantities.filter(iq => iq.id);
          if (ingredientQuantitiesToAdd instanceof Array) {
            ingredientQuantitiesToAdd.forEach((ingredientQuantity: IngredientQuantityHttp) => updatedIngredientQuantities.push(ingredientQuantity));
            denormalizedMeal.ingredientQuantities = updatedIngredientQuantities;
          } else if (ingredientQuantitiesToAdd) {
            ingredientQuantitiesToAdd = [ingredientQuantitiesToAdd];
            ingredientQuantitiesToAdd.forEach((ingredientQuantity: IngredientQuantityHttp) => updatedIngredientQuantities.push(ingredientQuantity));
            denormalizedMeal.ingredientQuantities = updatedIngredientQuantities;
          }
          
          return [
            meal,
            updatedIngredientQuantities.map(item=>item).map(iq => {
              delete iq.text;
              return iq;
            }),
            this.http.put<MealHttp>(`${this.baseApiEndpoint}meals/${mealId}`, denormalizedMeal),
          ];
        })
    )
  }
}