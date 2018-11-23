import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Ingredient } from '../../../models/ingredient.model';
import { MatAutocomplete } from '@angular/material';

@Component({
  selector: 'ingredient-quantity-autocomplete',
  templateUrl: './ingredient-quantity-autocomplete.component.html',
  styleUrls: ['./ingredient-quantity-autocomplete.component.css']
})
export class IngredientQuantityAutocompleteComponent implements OnInit {

  constructor() { }
  @Input() myFormControl: AbstractControl;
  @Input() myPlaceholder: string;
  @ViewChild('myAuto') autocomplete: MatAutocomplete;
  @Input() myOptions: Ingredient[] = [];
  filteredOptions: Observable<Ingredient[]>
  
  ngOnInit() {
    this.filteredOptions = this.myFormControl.valueChanges
      .pipe(
        startWith<string | number | null>(''),
        map(value => value ? this._filter(value) : this.myOptions.slice())
      );
  }

  displayFn = (stringOrId?: string | number): string | undefined => {
    if (stringOrId) {
      if (typeof stringOrId === 'string') {
        return stringOrId;
      } else if (typeof stringOrId === 'number') {
        const filteredOptions = this.myOptions.filter(option => option.id === stringOrId);
        return filteredOptions.length ? filteredOptions[0].text : '';
      }
    }
    return undefined;
  }

  private _filter(value: string | number): Ingredient[] {
    if (value) {
      if (typeof value === 'string') {
        const filterValue = value.toLowerCase();
        return this.myOptions.filter(option => option.text.toLowerCase().indexOf(filterValue) > -1 );
      } else if (typeof value === 'number') {
        return this.myOptions.filter(option => option.id === value);
      }
      return [];
    } 
  }
}
