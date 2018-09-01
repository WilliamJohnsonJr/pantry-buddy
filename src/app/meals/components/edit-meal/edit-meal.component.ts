import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Meal } from '@app/meals/models/meal.model';
import { IngredientQuantity } from '@app/meals/models/ingredient-quantity.model';
import { Ingredient } from '@app/meals/models/ingredient.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMealComponent implements OnInit {
  constructor(
    public fb: FormBuilder
  ) { }
  @Input() meal: Meal;
  @Input() ingredientQuantities: IngredientQuantity[];
  @Input() ingredients: Ingredient[];
  formGroup: FormGroup;
  ngOnInit() {
    this.formGroup = this.fb.group({
      recipe: [null],
      ingredientQuantities: this.fb.array([
        this.initIngredientQuantities()
      ])
    })
  }

  initIngredientQuantities() {
    this.ingredientQuantities.map(
      ingredientQuantity => this.addIngredientQuantity()
    )
  }

  initIngredientQuantity() {
    return this.fb.group({
      id: [null],
      quantity: [null]
    })
  }

  addIngredientQuantity() {
    const control: FormArray = this.formGroup.controls['ingredientQuantities'] as FormArray;
    control.push(this.initIngredientQuantity())
  }

  removeIngredientQuantity(x: number) {
    const control: FormArray = this.formGroup.controls['ingredientQuantities'] as FormArray;
    control.removeAt(x);
  }

  onSubmit() {}
  
}
