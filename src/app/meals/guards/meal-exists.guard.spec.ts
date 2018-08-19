import { TestBed, async, inject } from '@angular/core/testing';

import { MealExistsGuard } from './meal-exists.guard';

describe('MealExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MealExistsGuard]
    });
  });

  it('should ...', inject([MealExistsGuard], (guard: MealExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
