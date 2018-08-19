import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BASE_API_ENDPOINT } from '@app/app.tokens';
import { Meal } from '@app/meals/models/meal.model';
import { MealHttp } from '@app/meals/models/meal-http.model';
import { mealsSchema } from '@app/meals/schemas/meal-schemas';
import { normalize } from 'normalizr';

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

  getMeals(): Observable<Meal[]> {
    return this.http.get<MealHttp[]>(`${this.baseApiEndpoint}meals`).pipe(
      map((meals: MealHttp[]): Meal[] => {

        // Normalizes data and returns normalized array rather than array of nested objects
        const normalizedData = normalize({meals: meals}, mealsSchema);
        return normalizedData.result.meals.map(id => normalizedData.entities.meals[id]);
      })
    )
  }

  // updateMeal(meal: Meal): Observable<Meal> {
  //   return this.http.put<Meal>(`${this.baseApiEndpoint}meals/${meal.id}`, meal)
  // }
}