export interface MealHttp {
    "id": number;
    "name": string;
    "imageUrl": string;
    "ingredientsQuantities": IngredientQuantityHttp[], 
    "recipe": string;
  }

export interface IngredientQuantityHttp {
    "id": number,
    "ingredientId": number,
    "text": "Slice of Wheat Bread",
    "quantity": number
}