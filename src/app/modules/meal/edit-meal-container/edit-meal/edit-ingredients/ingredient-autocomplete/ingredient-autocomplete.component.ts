import { Component, OnInit, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { Ingredient } from '@state//ingredient/ingredient.model';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { takeWhile, startWith, map } from 'rxjs/operators';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';

@Component({
  selector: 'ingredient-autocomplete',
  templateUrl: './ingredient-autocomplete.component.html',
  styleUrls: ['./ingredient-autocomplete.component.css']
})
export class IngredientAutocompleteComponent implements OnInit, OnChanges {
  constructor(private fb: FormBuilder) { }
  @Input() ingredientsList: Ingredient[];
  @Input() ingredient: Ingredient;
  @Output() ingredientChange: EventEmitter = new EventEmitter();
  @Input() formOn: boolean;
  formGroup: FormGroup;
  filteredIngredients: Observable<Ingredient[]>;
  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ingredient'] && changes['ingredient'].currentValue) {
      this.formGroup.patchValue(this.ingredient)
    }
  }

  autocompleteValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value 
      ? null 
      : +control.value
        ? null
        : {invalid: control.value}
    }
  }

  buildForm() {
    this.formGroup = this.fb.group({
      id: ['', [Validators.required, this.autocompleteValidator()]]
    });

    this.filteredIngredients = this.formGroup.valueChanges
    .pipe(
      startWith(''),
      map(value => value ? this.filterIngredients(value) : this.ingredientsList.slice())
    );

    this.formGroup.valueChanges.pipe(
      takeWhile(() => this.formOn)
    ).subscribe(
      value => {
        if (!this.formGroup.valid) {
          return;
        }
        this.ingredientChange.emit(value);
      }
    )
  }

  filterIngredients(text: string): Ingredient[] {
     {
      return this.ingredientsList.filter(ingredient =>
        ingredient.text.toLowerCase().indexOf(text.toLowerCase()) === 0);
    }
  }

  displayFn(value: string): string {
    if (+value) {
      const foundIngredient: Ingredient[] = this.ingredientsList.filter(ingredient => +ingredient.id === +value);
      return foundIngredient.length ? foundIngredient[0].text : ''
    }
    return value;
  }

}
