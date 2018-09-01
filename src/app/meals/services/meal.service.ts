import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BASE_API_ENDPOINT } from '@app/app.tokens';
import { Meal } from '@app/meals/models/meal.model';
import { MealHttp } from '@app/meals/models/meal-http.model';
import { mealsSchema } from '@app/meals/schemas/meal-schemas';
import { normalize } from 'normalizr';
import { IngredientQuantity } from '@app/meals/models/ingredient-quantity.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  constructor(private http: HttpClient, @Inject(BASE_API_ENDPOINT) private baseApiEndpoint){}

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

  // updateMeal(meal: Meal): Observable<Meal> {
  //   return this.http.put<Meal>(`${this.baseApiEndpoint}meals/${meal.id}`, meal)
  // }
}