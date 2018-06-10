import { TestBed, inject } from '@angular/core/testing';

import { IngredientQuantityService } from './ingredient-quantity.service';

describe('IngredientQuantityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientQuantityService]
    });
  });

  it('should be created', inject([IngredientQuantityService], (service: IngredientQuantityService) => {
    expect(service).toBeTruthy();
  }));
});
