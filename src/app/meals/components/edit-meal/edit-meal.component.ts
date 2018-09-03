import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Meal } from '@app/meals/models/meal.model';
import { IngredientQuantity } from '@app/meals/models/ingredient-quantity.model';
import { Ingredient } from '@app/meals/models/ingredient.model';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

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
  get ingredientQuantitiesFormArray(): FormArray{
    return <FormArray>this.formGroup.get('ingredientQuantities');
  }
    
  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [this.meal.name, Validators.required],
      imageUrl: [this.meal.imageUrl, Validators.required],
      ingredientQuantities: this.initIngredientQuantities(),
      recipe: [this.meal.recipe, Validators.required]
    });
  }

  setFormValues() {
    this.formGroup.setValue({
      name: [this.meal.name, Validators.required],
      imageUrl: [this.meal.imageUrl, Validators.required],
      ingredientQuantities: this.initIngredientQuantities(),
      recipe: [this.meal.recipe, Validators.required]
    });
  }

  initIngredientQuantities(): FormArray {
    let formArray = this.fb.array([]);
    this.ingredientQuantities.map(
      ingredientQuantity => formArray.push(this.initIngredientQuantity(ingredientQuantity))
    );
    return formArray;
  }

  initIngredientQuantity(data?: IngredientQuantity): FormGroup {
    return this.fb.group({
      ingredientId: [data ? data.ingredientId : null, Validators.required],
      quantity: [data ? data.quantity : null, Validators.required]
    })
  }

  addIngredientQuantity(data?: IngredientQuantity) {
    this.ingredientQuantitiesFormArray.push(this.initIngredientQuantity(data))
  }

  removeIngredientQuantity(i: number) {
    this.ingredientQuantitiesFormArray.removeAt(i);
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
  
}
