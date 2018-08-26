import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Meal } from '@app/meals/models/meal.model';

@Component({
  selector: 'meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {

  constructor() { }
  @Input() meal: Meal;
  ngOnInit() {}

}
