import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from '@state/meal/meal.model';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { IngredientQuantity } from '@state/ingredient-quantity/ingredient-quantity.model';
import { Store } from '@ngrx/store';
import { State } from '@app/state/reducers';
import { selectAllIngredientQuantities } from '@app/state/ingredient-quantity/ingredient-quantity.reducer';

@Component({
  selector: 'edit-meal-container',
  templateUrl: './edit-meal-container.component.html',
  styleUrls: ['./edit-meal-container.component.css']
})
export class EditMealContainerComponent implements OnInit {
  ingredientQuantities$: Observable<IngredientQuantity[]>;

  constructor(private router: Router, private store: Store<State>) {}

  ngOnInit() {
    // this.ingredientQuantities$ = this.store.select(selectAllIngredientQuantities)
  }
}

