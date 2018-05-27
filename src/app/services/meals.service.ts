import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Meal } from '../interfaces/meal.interface';
import { MealsModule } from '../modules/meals/meals.module';
import { BaseService } from './base.service';
import { API_ENDPOINT } from '../app.tokens';
import { Ingredient } from '../interfaces/ingredient.interface';

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

  getMeals(): Observable<Array<Meal>> {
    return this.http.get<Meal[]>(`${this.apiEndpoint}meals`).pipe(
      map(meals => meals = meals.map(meal => {
        meal.id = meal.id.toString();
        return meal;
      }))
    )
  }

  updateMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiEndpoint}meals/${meal.id}`, meal)
  }
}