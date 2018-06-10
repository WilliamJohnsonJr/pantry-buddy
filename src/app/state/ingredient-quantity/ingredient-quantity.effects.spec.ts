import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IngredientQuantityEffects } from './ingredient-quantity.effects';

describe('IngredientQuantityService', () => {
  let actions$: Observable<any>;
  let effects: IngredientQuantityEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IngredientQuantityEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(IngredientQuantityEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
