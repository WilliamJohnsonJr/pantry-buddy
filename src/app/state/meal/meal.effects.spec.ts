import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MealEffects } from './meal.effects';

describe('MealService', () => {
  let actions$: Observable<any>;
  let effects: MealEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MealEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(MealEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
