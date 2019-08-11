import { Component, OnInit } from '@angular/core';
import { Meal } from '@state/meal/meal.model';
import { Observable } from 'rxjs';
import { IngredientQuantity } from '@state/ingredient-quantity/ingredient-quantity.model';
import { Store } from '@ngrx/store';
import * as fromMeal from '@state/meal/meal.reducer';
import { selectCurrentMeal, selectIngredientQuantitiesBySelectedMeal, selectAllIngredients, selectIngredientEntities } from '@state/reducers/index';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '@app/state/ingredient/ingredient.model';
import { Dictionary } from '@ngrx/entity/src/models';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  meal$: Observable<Meal>;
  ingredientQuantities$: Observable<IngredientQuantity[]>;
  ingredients$: Observable<Dictionary<Ingredient>>
  selectedMealId$: Observable<string>;
  constructor(private store: Store<fromMeal.State>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.meal$ = this.store.select(selectCurrentMeal);
    this.ingredients$ = this.store.select(selectIngredientEntities);
    this.ingredientQuantities$ = this.store.select(selectIngredientQuantitiesBySelectedMeal);
  }
}
