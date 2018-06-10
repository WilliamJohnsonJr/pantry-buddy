import { Component, OnInit } from '@angular/core';
import { Meal } from '@state/meal/meal.model';
import { Observable } from 'rxjs';
import { IngredientQuantity } from '@state/ingredient-quantity/ingredient-quantity.model';
import { Store } from '@ngrx/store';
import * as mealActions from '@state/meal/meal.actions';
import * as fromMeal from '@state/meal/meal.reducer';
import { selectCurrentMeal, selectCurrentMealId } from '@state/reducers/index';
import { AddMeal } from '../../../state/meal/meal.actions';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  meal$: Observable<Meal>;
  ingredientQuantities$: Observable<IngredientQuantity[]>;
  selectedMealId$: Observable<string>;
  constructor(private store: Store<fromMeal.State>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.meal$ = this.store.select(selectCurrentMeal);
  }

  createMeal(payload: Meal) {
    const meal: Meal = {
      id: '0',
      name: payload.name,
      imageUrl: payload.imageUrl,
      ingredients: payload.ingredients,
      recipe: payload.recipe
    }
    this.store.dispatch(new mealActions.UpsertMeal({meal: meal}))
  }

  update
}
