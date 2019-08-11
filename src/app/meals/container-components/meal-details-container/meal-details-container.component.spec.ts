import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDetailsContainerComponent } from './meal-details-container.component';

describe('MealDetailsContainerComponent', () => {
  let component: MealDetailsContainerComponent;
  let fixture: ComponentFixture<MealDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
