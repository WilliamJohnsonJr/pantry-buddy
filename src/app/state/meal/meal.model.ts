import { Ingredient } from "@state/ingredient/ingredient.model";

export interface Meal {
    id: string; // number on db
    name: string;
    imageUrl: string;
    ingredients: string[]; // array of Ingredient ids
    recipe: string;
  }