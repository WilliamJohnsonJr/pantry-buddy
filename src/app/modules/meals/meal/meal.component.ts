import { Component, OnInit } from '@angular/core';
import { MealFacade } from '@state/meal/meal.facade';
import { Meal } from '@state/meal/meal.model';
import { Observable } from 'rxjs';
import { IngredientQuantity } from '../../../state/ingredient-quantity/ingredient-quantity.model';
import { ApplicationState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { IngredientQuantityQuery } from '@app/state/ingredient-quantity/ingredient-quantity.reducer';
import { LoadIngredientQuantities } from '../../../state/ingredient-quantity/ingredient-quantity.actions';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  // With Facade architecture
  meal$: Observable<Meal> = this.mealFacade.selectedMeal$;

  // Without Facade architecture
  ingredientQuantities$: Observable<IngredientQuantity[]>;
  constructor(private mealFacade: MealFacade, private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.ingredientQuantities$ = this.store.select(IngredientQuantityQuery.getIngredientQuantities)
    this.store.dispatch(new LoadIngredientQuantities());
  }
}
