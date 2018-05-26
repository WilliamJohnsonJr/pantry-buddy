import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from '../app.tokens';
import { Meal } from '../interfaces/meal.interface';
import { MealsModule } from '../modules/meals/meals.module';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint) {}

  getMeal(id: string): Observable<Meal> {
    return this.http.get<Meal>(`${this.apiEndpoint}meals/${id}`)
  }

  getMeals(): Observable<Array<Meal>> {
    return this.http.get<Meal[]>(`${this.apiEndpoint}meals`)
  }

  updateMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiEndpoint}meals/${meal.id}`, meal)
  }
}