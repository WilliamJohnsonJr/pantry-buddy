import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '@app/state/ingredient/ingredient.model';
import { IngredientQuantity } from '../../../../state/ingredient-quantity/ingredient-quantity.model';

@Component({
  selector: 'ingredient-display',
  templateUrl: './ingredient-display.component.html',
  styleUrls: ['./ingredient-display.component.css']
})
export class IngredientDisplayComponent implements OnInit {
@Input() ingredients: Ingredient[];
@Input() ingredientQuantities: IngredientQuantity[];
  constructor() { }

  ngOnInit() {}

}
