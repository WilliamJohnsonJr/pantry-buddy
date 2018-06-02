import { Ingredient } from "@state/ingredient/ingredient.model";

export interface Meal {
    id: string; // number on db
    name: string;
    imageUrl: string;
    ingredients: Ingredient[]; // array of Ingredient Objects that must be flattened out
    recipe: string;
  }