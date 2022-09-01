import { Component, OnInit, Input, Output, ChangeDetectionStrategy, AfterViewInit, EventEmitter } from '@angular/core';
import { Meal } from '@app/meals/models/meal.model';
import { IngredientQuantity } from '@app/meals/models/ingredient-quantity.model';
import { Ingredient } from '@app/meals/models/ingredient.model';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';

@Component({
  selector: 'edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMealComponent implements OnInit {
  constructor(
    public fb: UntypedFormBuilder
  ) { }
  @Output() submitEvent: EventEmitter<IngredientQuantity[]> = new EventEmitter<IngredientQuantity[]>();
  @Input() meal: Meal;
  @Input() ingredientQuantities: IngredientQuantity[];
  @Input() ingredients: Ingredient[];
  formGroup: UntypedFormGroup;
  get ingredientQuantitiesFormArray(): UntypedFormArray{
    return <UntypedFormArray>this.formGroup.get('ingredientQuantities');
  }
    
  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.meal.id],
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

  initIngredientQuantities(): UntypedFormArray {
    let formArray = this.fb.array([]);
    this.ingredientQuantities.map(
      ingredientQuantity => formArray.push(this.initIngredientQuantity(ingredientQuantity))
    );
    return formArray;
  }

  initIngredientQuantity(data?: IngredientQuantity): UntypedFormGroup {
    return this.fb.group({
      id: [data ? data.ingredientId : null],
      ingredientId: [data ? data.ingredientId : null, Validators.required],
      quantity: [data ? data.quantity : null, Validators.required],
      mealId: [this.meal.id]
    })
  }

  addIngredientQuantity(data?: IngredientQuantity) {
    this.ingredientQuantitiesFormArray.push(this.initIngredientQuantity(data))
  }

  removeIngredientQuantity(i: number) {
    this.ingredientQuantitiesFormArray.removeAt(i);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.submitEvent.emit(this.formGroup.value);
    } else {
      console.error('Invalid fields.');
    }
  }
  
}
