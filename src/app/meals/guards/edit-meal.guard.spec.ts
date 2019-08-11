import { TestBed, async, inject } from '@angular/core/testing';

import { EditMealGuard } from './edit-meal.guard';

describe('EditMealGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditMealGuard]
    });
  });

  it('should ...', inject([EditMealGuard], (guard: EditMealGuard) => {
    expect(guard).toBeTruthy();
  }));
});
