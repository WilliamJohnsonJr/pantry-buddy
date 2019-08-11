import { MealsModule } from '@app/meals/meals.module';

describe('MealsModule', () => {
  let mealsModule: MealsModule;

  beforeEach(() => {
    mealsModule = new MealsModule();
  });

  it('should create an instance', () => {
    expect(mealsModule).toBeTruthy();
  });
});
