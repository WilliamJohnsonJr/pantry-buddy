import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../../../interfaces/meal.interface';
import { MealsFacade } from '../../../state/meals/meals.facade';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss']
})
export class MealsListComponent implements OnInit {

  meals$: Observable<Array<Meal>>;
  

  constructor(private mealsFacade: MealsFacade) { }

  ngOnInit () {
    this.meals$ = this.mealsFacade.getMeals();
  }

  trackByMealId(index, meal) {
    return meal.id;
  }
}
