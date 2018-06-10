import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '@state/meal/meal.model';
import {MealActions} from '@state/meal/meal.actions';
import { Store } from '@ngrx/store';
import { selectAllMeals, State } from '@state/reducers/index';
import { LoadMeals } from '../../../state/meal/meal.actions';


@Component({
  selector: 'meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {

  meals$: Observable<Meal[]>;

  constructor(private store: Store<State>) { }

  ngOnInit () {
    this.meals$ = this.store.select(selectAllMeals);
    this.store.dispatch(new LoadMeals());
  }

  /*
  * The trackBy function tells Angular to detect changes in the list based upon the id of each item. Otherwise, Angular destroys
  * and re-renders everything. Brrr! Expensive!
  */
  trackByMealId(index, meal) {
    return meal.id;
  }
}
