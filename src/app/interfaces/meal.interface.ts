import { Ingredient } from "./ingredient.interface";

export interface Meal {
    id: string; // number on db
    name: string;
    imageUrl: string;
    ingredients: Ingredient[]; // array of Ingredient Objects that must be flattened out
    recipe: string;
  }