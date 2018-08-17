export interface MealHttp {
    "id": number;
    "name": string;
    "imageUrl": string;
    "ingredientQuantities": any[], // TODO: Add IngredientQuantityHttp model
    "recipe": string;
  }