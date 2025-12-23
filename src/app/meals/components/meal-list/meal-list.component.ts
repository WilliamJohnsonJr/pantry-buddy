import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Meal } from '@app/meals/models/meal.model';

@Component({
    selector: 'meal-list',
    templateUrl: './meal-list.component.html',
    styleUrls: ['./meal-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MealListComponent {
  constructor() { }
  @Input() meals: Meal[];

  /*
  * The trackBy function tells Angular to detect changes in the list based upon the id of each item. Otherwise, Angular destroys
  * and re-renders everything. Brrr! Expensive!
  */
  trackById(index, meal) {
    return meal.id;
  }
}
