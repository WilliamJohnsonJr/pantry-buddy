import { IngredientQuantityHttp } from "@app/state/ingredient-quantity/ingredient-quantity-http.interface";

export interface MealHttp {
    "id": number;
    "name": string;
    "imageUrl": string;
    "ingredientQuantities": IngredientQuantityHttp[], 
    "recipe": string;
  }