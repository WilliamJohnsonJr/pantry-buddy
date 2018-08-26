import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Meal } from '@app/meals/models/meal.model';
import { IngredientQuantity } from '@app/meals/models/ingredient-quantity.model';

@Component({
  selector: 'meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealDetailsComponent implements OnInit {

  constructor() { }
  @Input() meal: Meal;
  @Input() ingredientQuantities: IngredientQuantity[];
  ngOnInit() {}

}
