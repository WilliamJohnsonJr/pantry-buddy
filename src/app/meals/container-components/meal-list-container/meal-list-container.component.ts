import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as fromMeals from '@app/meals/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Meal } from '@app/meals/models/meal.model';
import * as MealActions from '@app/meals/actions/meal.actions'

@Component({
  selector: 'meal-list-container',
  templateUrl: './meal-list-container.component.html',
  styleUrls: ['./meal-list-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealListContainerComponent implements OnInit {

  constructor(private store: Store<fromMeals.State>) { }
  meals$: Observable<Meal[]>;
  ngOnInit () {
    this.meals$ = this.store.pipe(select(fromMeals.getAllMeals));
    this.store.dispatch(new MealActions.LoadMealsRequest());
  }

}
