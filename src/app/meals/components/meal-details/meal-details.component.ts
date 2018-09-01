import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Meal } from '@app/meals/models/meal.model';
import { IngredientQuantity } from '@app/meals/models/ingredient-quantity.model';
import { Ingredient } from '@app/meals/models/ingredient.model';

interface IngredientQuantityJoin extends IngredientQuantity {
  text: string;
}

@Component({
  selector: 'meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealDetailsComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() meal: Meal;
  @Input() ingredientQuantities: IngredientQuantity[];
  @Input() ingredients: Ingredient[];
  ingredientQuantityJoins: IngredientQuantityJoin[]; // Since our ingredientQuantities do not have 
  // a text property, but they have the ingredientid, we do a join to look up the text
  // on the ingredient. This is only used inside the display component.

  ngOnInit() {}

  ngOnChanges() {
    this.ingredientQuantityJoins = this.ingredientQuantities
    .map(ingredientQuantity => ({
      ...ingredientQuantity,
       text: this.ingredients.filter(ingredient => ingredient.id === ingredientQuantity.id)[0].text
      }));
  }

  trackById(ingredientQuantityJoin): number {
    return ingredientQuantityJoin.id;
  }

}
