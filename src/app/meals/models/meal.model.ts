export interface Meal {
  id: number;
  name: string;
  imageUrl: string;
  ingredientQuantities: number[]; // array of Ingredient ids
  recipe: string;
}