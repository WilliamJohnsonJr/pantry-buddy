import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

import { MatAutocomplete } from '@angular/material';
import { IdTextObject } from '@app/my-material/models/id-text-object.model';

@Component({
  selector: 'my-autocomplete',
  templateUrl: './my-autocomplete.component.html',
  styleUrls: ['./my-autocomplete.component.css']
})
export class MyAutocompleteComponent implements OnInit {

  constructor() { }
  @Input() myFormControl: AbstractControl;
  @Input() myPlaceholder: string;
  @ViewChild('myAuto') autocomplete: MatAutocomplete;
  @Input() myOptions: IdTextObject[] = [];
  filteredOptions: Observable<IdTextObject[]>
  
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

  private _filter(value: string | number): IdTextObject[] {
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
