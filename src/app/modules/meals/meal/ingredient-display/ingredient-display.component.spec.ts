import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDisplayComponent } from './ingredient-display.component';

describe('IngredientDisplayComponent', () => {
  let component: IngredientDisplayComponent;
  let fixture: ComponentFixture<IngredientDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
