import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealListContainerComponent } from './meal-list-container.component';

describe('MealListContainerComponent', () => {
  let component: MealListContainerComponent;
  let fixture: ComponentFixture<MealListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
