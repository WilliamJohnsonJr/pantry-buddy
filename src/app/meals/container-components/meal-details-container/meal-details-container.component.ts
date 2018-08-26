import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromMeals from '@app/meals/reducers';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Meal } from '@app/meals/models/meal.model';
import * as MealActions from '@app/meals/actions/meal.actions';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'meal-details-container',
  templateUrl: './meal-details-container.component.html',
  styleUrls: ['./meal-details-container.component.css']
})
export class MealDetailsContainerComponent implements OnInit {
  constructor(private store: Store<fromMeals.State>, private route: ActivatedRoute) {}
  meal$: Observable<Meal> = this.store.pipe(select(fromMeals.getSelectedMeal));
  ngOnInit() {}

}
