import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Meal } from '@app/state/meal/meal.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { EventEmitter } from 'events';

@Component({
  selector: 'edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.css']
})
export class EditMealComponent implements OnInit, OnChanges {
  constructor(private fb: FormBuilder) { }
  @Input() meal: Meal;
  @Output() mealChange: EventEmitter = new EventEmitter();
  formGroup: FormGroup;
  formOn: boolean;

  ngOnInit() {
    this.formOn = true;
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['meal'] && changes['meal'].currentValue) {
      this.formGroup.patchValue(this.meal);
    }
  }

  buildForm() {
    this.formGroup = this.fb.group({
      name: [''],
      imageUrl: [''],
      ingredients: this.fb.array([]),
      recipe: ['']
    });
    this.formGroup.valueChanges.pipe(
      takeWhile(() => this.formOn)
    ).subscribe(value => {
      if (!this.formGroup.valid) {
        return;
      }
      this.mealChange.emit(value);
    })
  }

}
