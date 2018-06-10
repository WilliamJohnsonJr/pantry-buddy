import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMealContainerComponent } from './edit-meal-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('EditMealContainerComponent', () => {
  let component: EditMealContainerComponent;
  let fixture: ComponentFixture<EditMealContainerComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ EditMealContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMealContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
