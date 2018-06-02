import * as mealActions from './meal.actions';
import { mealReducer } from './meal.reducer';

describe(`mealReducer`, ()=> {
    describe('loadMealsAction', ()=> {
        it(`should get all meals`, () => {
            const currentState = {
                ids: [],
                entities: {},
                selectedMealId: undefined,
                loaded: false,
            };
            const expectedResult = {
                ids:['1'],
                entities: {
                    '1': {
                        "id": 1,
                        "name": "Peanut Butter Jelly Bash",
                        "imageUrl": "https://images.pexels.com/photos/236834/pexels-photo-236834.jpeg?cs=srgb&dl=bread-creamy-food-236834.jpg&fm=jpg",
                        "ingredients": [
                          {"id": 1, "text": "Slice of Wheat Bread", "quantity": 2},
                          {"id": 2, "text": "Tbsp Peanut Butter", "quantity": 2},
                          {"id": 3, "text": "Tbsp Grape Jelly", "quantity": 2}      
                        ], 
                        "recipe": "Use utensil to spread Peanut Butter and Grape Jelly onto one slice of bread. Place other piece of bread on top. Enjoy."
                      }
                },
                selectedMealId: undefined,
                loaded: true
            }

            const samplePayload = [
                {
                      "id": '1',
                      "name": "Peanut Butter Jelly Bash",
                      "imageUrl": "https://images.pexels.com/photos/236834/pexels-photo-236834.jpeg?cs=srgb&dl=bread-creamy-food-236834.jpg&fm=jpg",
                      "ingredients": [
                        {"id": '1', "text": "Slice of Wheat Bread", "quantity": 2},
                        {"id": '2', "text": "Tbsp Peanut Butter", "quantity": 2},
                        {"id": '3', "text": "Tbsp Grape Jelly", "quantity": 2}      
                      ], 
                      "recipe": "Use utensil to spread Peanut Butter and Grape Jelly onto one slice of bread. Place other piece of bread on top. Enjoy."
                    }
              ];

            const action = new mealActions.LoadMealsSuccessAction(samplePayload);
            const result = mealReducer(currentState, action);
            expect(result).toEqual(expectedResult);
        })
    })
})