import { IngredientQuantityHttp } from './ingredient-quantity-http.model';

export interface MealHttp {
    "id": number;
    "name": string;
    "imageUrl": string;
    "ingredientQuantities": IngredientQuantityHttp[],
    "recipe": string;
    
  }