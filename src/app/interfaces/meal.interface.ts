import { Ingredient } from "./ingredient.interface";

export interface Meal {
    id: number;
    name: string;
    ingredients: number[];
    quantities: {[ingredientId: number]: number};
    recipe: string;
}