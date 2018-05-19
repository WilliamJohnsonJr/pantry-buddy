import { MealPlannerModule } from './meal-planner.module';

describe('MealPlannerModule', () => {
  let mealPlannerModule: MealPlannerModule;

  beforeEach(() => {
    mealPlannerModule = new MealPlannerModule();
  });

  it('should create an instance', () => {
    expect(mealPlannerModule).toBeTruthy();
  });
});
