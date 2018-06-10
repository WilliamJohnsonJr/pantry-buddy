export interface Meal {
  id: string; // number on db
  name: string;
  imageUrl: string;
  ingredients: string[]; // array of Ingredient ids
  recipe: string;
}