import { TestBed, inject } from '@angular/core/testing';

import { IngredientQuantitiesService } from './ingredient-quantities.service';

describe('IngredientQuantitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientQuantitiesService]
    });
  });

  it('should be created', inject([IngredientQuantitiesService], (service: IngredientQuantitiesService) => {
    expect(service).toBeTruthy();
  }));
});
