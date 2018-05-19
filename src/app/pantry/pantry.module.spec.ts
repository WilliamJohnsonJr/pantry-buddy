import { PantryModule } from './pantry.module';

describe('PantryModule', () => {
  let pantryModule: PantryModule;

  beforeEach(() => {
    pantryModule = new PantryModule();
  });

  it('should create an instance', () => {
    expect(pantryModule).toBeTruthy();
  });
});
