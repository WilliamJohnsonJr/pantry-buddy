import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ingredient } from '@app/state/ingredient/ingredient.model';
import { Observable } from 'rxjs';
import { IngredientQuantity } from '@state/ingredient-quantity/ingredient-quantity.model';

@Component({
  selector: 'edit-ingredients',
  templateUrl: './edit-ingredients.component.html',
  styleUrls: ['./edit-ingredients.component.css']
})
export class EditIngredientsComponent implements OnInit {
  constructor(private fb: FormBuilder){}
  // constructor(private fb: FormBuilder, private ingredientFacade: IngredientFacade) { }

  @Input() ingredientQuantities: IngredientQuantity[];
  ingredientsFormArray: FormArray;
  ingredients$: Observable<Ingredient[]>
  ngOnInit() {
  }

  private addIngredientFormGroups(ingredients: IngredientQuantity[]) {
    ingredients.forEach(ingredient => this.addIngredientFormGroup(ingredient));
  }

  private addIngredientFormGroup(ingredient: IngredientQuantity) {
    this.ingredientsFormArray.push(this.getIngredientFormGroup(ingredient));
  }

  private getIngredientFormGroup(ingredient: IngredientQuantity): FormGroup {
    return this.fb.group({
      id: [ingredient ? ingredient.ingredientId : null, Validators.required],
      quantity: [ingredient ? ingredient.quantity : null, Validators.required]
    })
  }

}
