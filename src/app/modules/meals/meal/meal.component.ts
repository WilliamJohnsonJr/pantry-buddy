import { Component, OnInit } from '@angular/core';
import { MealsFacade } from '../../../state/meals/meals.facade';
import { Meal } from '../../../interfaces/meal.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {
  contact$: Observable<Meal> = this.mealsFacade.selectedMeal$;
  constructor(private mealsFacade: MealsFacade) { }
}
