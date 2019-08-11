import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMealContainerComponent } from './edit-meal-container.component';

describe('EditMealContainerComponent', () => {
  let component: EditMealContainerComponent;
  let fixture: ComponentFixture<EditMealContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMealContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMealContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
