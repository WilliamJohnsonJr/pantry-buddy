import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IngredientEffects } from './ingredient.effects';

describe('IngredientEffects', () => {
  let actions$: Observable<any>;
  let effects: IngredientEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IngredientEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(IngredientEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
