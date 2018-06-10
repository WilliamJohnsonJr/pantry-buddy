import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IngredientQuantity } from '@state/ingredient-quantity/ingredient-quantity.model';
import { BaseService } from './base.service';
import { API_ENDPOINT } from '@app/app.tokens';
import { Ingredient } from '@state//ingredient/ingredient.model';
import { IngredientQuantityHttp } from '@app/state/ingredient-quantity/ingredient-quantity-http.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredientQuantityService {

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint){}
  getIngredientQuantity(id: string): Observable<IngredientQuantity> {
    return this.http.get<IngredientQuantity>(`${this.apiEndpoint}ingredientQuantities/${id}`).pipe(
      map(ingredientQuantity => {
        ingredientQuantity.id = ingredientQuantity.id.toString();
        return ingredientQuantity;
      })
    )
  }
  getIngredientQuantities(): Observable<IngredientQuantity[]> {
    return this.http.get<IngredientQuantityHttp[]>(`${this.apiEndpoint}ingredientQuantities`).pipe(
      map((ingredientQuantities: IngredientQuantityHttp[]): IngredientQuantity[] => {
        const transformedIngredientQuantities: IngredientQuantity[] = ingredientQuantities
        .map((ingredientQuantity: IngredientQuantityHttp) => {
          const myIngredientQuantity: IngredientQuantity = {
            id: String(ingredientQuantity.id),
            ingredientId: String(ingredientQuantity.ingredientId),
            text: ingredientQuantity.text,
            mealId: String(ingredientQuantity.mealId),
            quantity: ingredientQuantity.quantity
          }
          return myIngredientQuantity;
        });
        return transformedIngredientQuantities
      })
    )
  }

  updateIngredientQuantity(ingredientQuantity: IngredientQuantity): Observable<IngredientQuantity> {
    return this.http.put<IngredientQuantity>(`${this.apiEndpoint}ingredientQuantities/${ingredientQuantity.id}`, ingredientQuantity)
  }
}