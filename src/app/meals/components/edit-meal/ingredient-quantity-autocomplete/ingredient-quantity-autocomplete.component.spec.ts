import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientQuantityAutocompleteComponent } from './ingredient-quantity-autocomplete.component';

describe('IngredientQuantityAutocompleteComponent', () => {
  let component: IngredientQuantityAutocompleteComponent;
  let fixture: ComponentFixture<IngredientQuantityAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientQuantityAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientQuantityAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
