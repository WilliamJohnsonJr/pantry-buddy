import { Component, OnInit } from '@angular/core';
import { MealFacade } from '@state/meal/meal.facade';
import { Meal } from '@state/meal/meal.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {
  meal$: Observable<Meal> = this.mealFacade.selectedMeal$;
  constructor(private mealFacade: MealFacade) { }
}
