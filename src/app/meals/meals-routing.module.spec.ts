import { MealsRoutingModule } from '@app/meals/meals-routing.module';

describe('MealsRoutingModule', () => {
  let mealsRoutingModule: MealsRoutingModule;

  beforeEach(() => {
    mealsRoutingModule = new MealsRoutingModule();
  });

  it('should create an instance', () => {
    expect(mealsRoutingModule).toBeTruthy();
  });
});
