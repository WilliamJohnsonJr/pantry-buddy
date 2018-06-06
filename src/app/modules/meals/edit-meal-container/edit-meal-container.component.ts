import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from '@state/meal/meal.model';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { MealFacade } from '@state/meal/meal.facade';
import { IngredientQuantity } from '@state/ingredient-quantity/ingredient-quantity.model';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@app/state/app.state';
import { IngredientQuantityQuery } from '@app/state/ingredient-quantity/ingredient-quantity.reducer';
import { LoadIngredientQuantities } from '@state/ingredient-quantity/ingredient-quantity.actions';

@Component({
  selector: 'edit-meal-container',
  templateUrl: './edit-meal-container.component.html',
  styleUrls: ['./edit-meal-container.component.css']
})
export class EditMealContainerComponent implements OnInit {
  // With Facade architecture
  meal$: Observable<Meal> = this.mealsFacade.selectedMeal$.pipe(
    map(meal => ({...meal}))
  );

  // Without Facade architecture
  ingredientQuantities$: Observable<IngredientQuantity[]>;

  constructor(private router: Router, private mealsFacade: MealFacade, private store: Store<ApplicationState>) {}

  ngOnInit() {
    this.ingredientQuantities$ = this.store.select(IngredientQuantityQuery.getIngredientQuantities);
    this.store.dispatch(new LoadIngredientQuantities());
  }

  cancel(meal: Meal) {
    this.router.navigate(['/meal', meal.id]);
  }

  save(meal: Meal) {
    this.mealsFacade.updateMeal(meal);
  }
}

