import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BASE_API_ENDPOINT } from '@app/app.tokens';
import { Ingredient } from '../models/ingredient.model';
import { Store} from '@ngrx/store';
import * as fromMeals from '@app/meals/reducers';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(
    private http: HttpClient,
    @Inject(BASE_API_ENDPOINT) private baseApiEndpoint,
    private store: Store<fromMeals.State>){}

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.baseApiEndpoint}ingredients`);
  }

  getIngredient(id: number): Observable<Ingredient>{
    return this.http.get<Ingredient>(`${this.baseApiEndpoint}ingredients/${id}`)
  }
}
