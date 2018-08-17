import { Component, OnInit } from '@angular/core';
import * as fromMeals from '@app/meals/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Meal } from '@app/meals/models/meal.model';
import * as MealActions from '@app/meals/actions/meal.actions'

@Component({
  selector: 'meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {

  meals$: Observable<Meal[]>;

  constructor(private store: Store<fromMeals.State>) { }

  ngOnInit () {
    this.meals$ = this.store.pipe(select(fromMeals.getAllMeals));
    this.store.dispatch(new MealActions.LoadMealsRequest());
  }

  /*
  * The trackBy function tells Angular to detect changes in the list based upon the id of each item. Otherwise, Angular destroys
  * and re-renders everything. Brrr! Expensive!
  */
  trackById(index, meal) {
    return meal.id;
  }
}
