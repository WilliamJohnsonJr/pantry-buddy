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

@Injectable({
  providedIn: 'root'
})
export class MealService {
  constructor(private http: HttpClient, @Inject(BASE_API_ENDPOINT) private baseApiEndpoint){}

  getMeal(id: number): Observable<Meal> {
    return this.http.get<MealHttp>(`${this.baseApiEndpoint}meals/${id}`).pipe(
      map(meal => {
        // Normalizes data and returns normalized array rather than array of nested objects
        const normalizedData = normalize({meals: meal}, mealsSchema);
        const dataArray = normalizedData.result.meals.map(id => normalizedData.entities.meals[id]);
        return dataArray[1];
      })
    )
  }

  getMeals(): Observable<{meals: Meal[], ingredientQuantities: IngredientQuantity[]}> {
    return this.http.get<MealHttp[]>(`${this.baseApiEndpoint}meals`).pipe(
      map((meals: MealHttp[]): {meals: Meal[], ingredientQuantities: IngredientQuantity[]} => {
        // Normalizes data and returns normalized array rather than array of nested objects
        const normalizedData = normalize({meals: meals}, mealsSchema);
        const mealsData = normalizedData.result.meals.map(id => normalizedData.entities.meals[id]);
        // We have to return an array to LoadIngredientQuantities action, so we run through the normalized
        // ingredientQuantities object using Object.keys and convert it to an array of IngredientQuantity objects.
        const ingredientQuantitiesData = Object.keys(normalizedData.entities.ingredientQuantities).map(key => normalizedData.entities.ingredientQuantities[key]);
        return {meals: mealsData, ingredientQuantities: ingredientQuantitiesData};
      })
    )
  }

  // updateMeal(meal: Meal): Observable<Meal> {
  //   return this.http.put<Meal>(`${this.baseApiEndpoint}meals/${meal.id}`, meal)
  // }
}