import { MealModule } from './meal.module';

describe('MealModule', () => {
  let mealModule: MealModule;

  beforeEach(() => {
    mealModule = new MealModule();
  });

  it('should create an instance', () => {
    expect(mealModule).toBeTruthy();
  });
});
