import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import * as fromMeals from '@app/meals/reducers';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Meal } from '@app/meals/models/meal.model';
import { ActivatedRoute } from '@angular/router';
import { IngredientQuantity } from '@app/meals/models/ingredient-quantity.model';
import { Ingredient } from '@app/meals/models/ingredient.model';

@Component({
  selector: 'edit-meal-container',
  templateUrl: './edit-meal-container.component.html',
  styleUrls: ['./edit-meal-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMealContainerComponent implements OnInit {

  constructor(private store: Store<fromMeals.State>, private route: ActivatedRoute) {}
  meal$: Observable<Meal> = this.store.pipe(select(fromMeals.getSelectedMeal));
  ingredientQuantities$: Observable<IngredientQuantity[]> = this.store.select(fromMeals.getIngredientQuantitiesForSelectedMeal)
  ingredients$: Observable<Ingredient[]> = this.store.select(fromMeals.getIngredientsForSelectedMeal)

  ngOnInit(){}
}
