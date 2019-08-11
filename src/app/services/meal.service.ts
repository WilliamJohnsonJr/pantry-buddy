import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Meal } from '@state/meal/meal.model';
import { MealModule } from '@modules/meal/meal.module';
import { BaseService } from './base.service';
import { API_ENDPOINT } from '@app/app.tokens';
import { Ingredient } from '@state//ingredient/ingredient.model';
import { IngredientQuantity } from '@state/ingredient-quantity/ingredient-quantity.model';
import { MealHttp } from '@state/meal/meal-http.interface';
import { normalize, schema } from 'normalizr';
import {mealsSchema} from '@state/schemas';
import { store } from '@angular/core/src/render3/instructions';
@Injectable({
  providedIn: 'root'
})
export class MealService {
  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint){}

  getMeal(id: string): Observable<{
    meal: Meal,
    ingredientQuantities: IngredientQuantity[],
    ingredients: Ingredient[]
  }> {
    return this.http.get<MealHttp>(`${this.apiEndpoint}meals/${id}`).pipe(
      map(meal => {
        const normalizedPayload: {
          meals: Meal[],
          ingredientQuantities: IngredientQuantity[],
          ingredients: Ingredient[]
        } = this._transformMealsPayload([meal]);
        const result = {
          meal: normalizedPayload.meals[0],
          ingredientQuantities: normalizedPayload.ingredientQuantities,
          ingredients: normalizedPayload.ingredients
        };
        return result;
      })
    )
  }

  getMeals(): Observable<{
    meals: Meal[],
    ingredientQuantities: IngredientQuantity[],
    ingredients: Ingredient[]
  }> {
    return this.http.get<MealHttp[]>(`${this.apiEndpoint}meals`).pipe(
      map((meals: MealHttp[]): {
        meals: Meal[],
        ingredientQuantities: IngredientQuantity[],
        ingredients: Ingredient[]
      } => {
        return this._transformMealsPayload(meals);
      })
    )
  }

  updateMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiEndpoint}meals/${meal.id}`, meal)
  }

  private _transformMealsPayload(meals: MealHttp[]) {
    // Normalize the payload received from the server
    const normalizedData = normalize({meals: meals}, mealsSchema);

    // Convert numeric IDs to string IDs.
    const transformedMeals: Meal[] = normalizedData.result.meals.map(mealId => {
      const meal: {
        id: number;
        imageUrl: string;
        ingredientQuantities: number[];
        name: string;
        recipe: string;
      } = normalizedData.entities.meals[mealId];
      const myMeal: Meal = {
        id: String(meal.id),
        imageUrl: meal.imageUrl,
        ingredientQuantities: meal.ingredientQuantities.map((id: number): string => String(id)),
        name: meal.name,
        recipe: meal.recipe
      }
      return myMeal;
    });

    // Create IngredientQuantity[] to upsert into the store from the normalized data.
    const transformedIngredientQuantities: IngredientQuantity[] = [];
    for (let prop in normalizedData.entities.ingredientQuantities) {
      if (normalizedData.entities.ingredientQuantities.hasOwnProperty(prop)) {
        transformedIngredientQuantities.push(
          {
            ...normalizedData.entities.ingredientQuantities[prop],
            id: String(normalizedData.entities.ingredientQuantities[prop].id),
            ingredient: String(normalizedData.entities.ingredientQuantities[prop].ingredient)
          }
        );
      }
    }

    // Create Ingredient[] to upsert into the store from the normalized data.
    const transformedIngredients: Ingredient[] = [];
    for (let prop in normalizedData.entities.ingredients) {
      if (normalizedData.entities.ingredients.hasOwnProperty(prop)) {
        transformedIngredients.push({
          ...normalizedData.entities.ingredients[prop],
          id: String(normalizedData.entities.ingredients[prop].id)
        });
      }
    }

    return {
      meals: transformedMeals,
      ingredientQuantities: transformedIngredientQuantities,
      ingredients: transformedIngredients
    }
  }
}