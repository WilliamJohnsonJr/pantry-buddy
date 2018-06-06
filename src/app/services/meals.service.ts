import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Meal } from '@state/meal/meal.model';
import { MealsModule } from '@modules/meals/meals.module';
import { BaseService } from './base.service';
import { API_ENDPOINT } from '@app/app.tokens';
import { Ingredient } from '@state//ingredient/ingredient.model';
import { IngredientQuantity } from '@state/ingredient-quantity/ingredient-quantity.model';
import { MealHttp } from '@state/meal/meal-http.interface';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint){}

  getMeal(id: string): Observable<Meal> {
    return this.http.get<Meal>(`${this.apiEndpoint}meals/${id}`).pipe(
      map(meal => {
        meal.id = meal.id.toString();
        return meal;
      })
    )
  }

  getMeals(): Observable<Meal[]> {
    /*
          MealHttp {
            "id": 1,
            "name": "Peanut Butter Jelly Bash",
            "imageUrl": "https://images.pexels.com/photos/236834/pexels-photo-236834.jpeg?cs=srgb&dl=bread-creamy-food-236834.jpg&fm=jpg",
            "ingredientQuantities": [
              {"id": 1, "ingredientId": 1, "text": "Slice of Wheat Bread", "quantity": 2},
              {"id": 2, "ingredientId": 2, "text": "Tbsp Peanut Butter", "quantity": 2},
              {"id": 3, "ingredientId": 3, "text": "Tbsp Grape Jelly", "quantity": 2}      
            ], 
            "recipe": "Use utensil to spread Peanut Butter and Grape Jelly onto one slice of bread. Place other piece of bread on top. Enjoy."
          }

          IngredientQuantity {
            ingredientId: string;
            mealId: string;
            quantity: number;
          }
        
          Meal {
            id: string; // number on db
            name: string;
            imageUrl: string;
            ingredients: string[]; // array of Ingredient ids
            recipe: string;
          }
    */
    return this.http.get<MealHttp[]>(`${this.apiEndpoint}meals`).pipe(
      map((meals: MealHttp[]): Meal[] => {
        const transformedMeals: Meal[] = meals.map((meal: MealHttp) => {
          const myMeal: Meal = {
            id: String(meal.id),
            name: meal.name,
            ingredients: meal.ingredientQuantities.map(ingredientQuantity => String(ingredientQuantity.ingredientId)),
            imageUrl: meal.imageUrl,
            recipe: meal.recipe
          }
          return myMeal;
        });
        return transformedMeals
      })
    )
  }

  updateMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiEndpoint}meals/${meal.id}`, meal)
  }
}