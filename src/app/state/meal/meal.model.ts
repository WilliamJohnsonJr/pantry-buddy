export interface Meal {
  id: string; // number on db
  imageUrl: string;
  ingredientQuantities: string[]; // array of IngredientQuantity ids
  name: string;
  recipe: string;
}