import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '@state/meal/meal.interface';
import { MealFacade } from '@state/meal/meal.facade';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss']
})
export class MealsListComponent implements OnInit {

  meals$: Observable<Meal[]>;

  constructor(private mealFacade: MealFacade) { }

  ngOnInit () {
    this.meals$ = this.mealFacade.getMeals();
  }

  trackByMealId(index, meal) {
    return meal.id;
  }
}
