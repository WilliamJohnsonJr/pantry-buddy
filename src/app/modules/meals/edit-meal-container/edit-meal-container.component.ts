import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from '@state/meal/meal.interface';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { MealFacade } from '@state/meal/meal.facade';

@Component({
  selector: 'edit-meal-container',
  templateUrl: './edit-meal-container.component.html',
  styleUrls: ['./edit-meal-container.component.css']
})
export class EditMealContainerComponent {
  meal$: Observable<Meal> = this.mealsFacade.selectedMeal$.pipe(
    map(meal => ({...meal}))
  );
  
  constructor(private router: Router, private mealsFacade: MealFacade) {}

  cancel(meal: Meal) {
    this.router.navigate(['/meal', meal.id]);
  }

  save(meal: Meal) {
    this.mealsFacade.updateMeal(meal);
  }
}

