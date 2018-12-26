import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, combineLatest, forkJoin, of } from 'rxjs';
import { map, switchMap, take, mergeMap } from 'rxjs/operators';

import { BASE_API_ENDPOINT } from '@app/app.tokens';
import { Meal } from '@app/meals/models/meal.model';
import { MealHttp } from '@app/meals/models/meal-http.model';
import { mealsSchema, mealSchema } from '@app/meals/schemas/meal-schemas';
import { normalize, denormalize } from 'normalizr';
import { IngredientQuantity } from '@app/meals/models/ingredient-quantity.model';
import { Ingredient } from '../models/ingredient.model';
import { IngredientQuantityHttp } from '../models/ingredient-quantity-http.model';
import { Store, select } from '@ngrx/store';
import * as fromMeals from '@app/meals/reducers';
import * as fromIngredientQuantities from '@app/meals/reducers/ingredient-quantity.reducer';
import {Noop} from '@app/core/actions/util.actions';
import * as fromIngredients from '@app/meals/reducers/ingredient.reducer';
import { getIngredientEntitiesState } from '../reducers/index';
import { IngredientQuantityActionTypes, UpsertIngredientQuantities } from '../actions/ingredient-quantity.actions';
import { IngredientQuantityActions } from '@app/meals/actions/ingredient-quantity.actions';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_API_ENDPOINT) private baseApiEndpoint,
    private store: Store<fromMeals.State>){}

  getMeal(id: number): Observable<MealHttp> {
    return this.http.get<MealHttp>(`${this.baseApiEndpoint}meals/${id}`)
  }

  normalizeMeal = (mealHttp: MealHttp): {meal: Meal, ingredientQuantities: IngredientQuantity[], ingredients: Ingredient[]} => {
    // Normalizes data and returns normalized array rather than array of nested objects
    const normalizedData = normalize({meals: [mealHttp]}, mealsSchema);
    const mealDataArray = normalizedData.result.meals.map(id => normalizedData.entities.meals[id]);
    // We have to return an array to LoadIngredientQuantities action, so we run through the normalized
    // ingredientQuantities object using Object.keys and convert it to an array of IngredientQuantity objects.

    const ingredientQuantitiesDataArray = Object.keys(normalizedData.entities.ingredientQuantities)
    .map(key => normalizedData.entities.ingredientQuantities[key]).
    map(ingredientQuantity => {
      let clone: any = {...ingredientQuantity};
      delete clone.text;
      return clone; // prevents duplicate text property from entering data store
    });

    const ingredientsDataArray = Object.keys(normalizedData.entities.ingredientQuantities)
    .map(key => normalizedData.entities.ingredientQuantities[key])
    .map(ingredientQuantity => ({id: ingredientQuantity.ingredientId, text: ingredientQuantity.text}));

    return {meal: mealDataArray[0], ingredientQuantities: ingredientQuantitiesDataArray, ingredients: ingredientsDataArray};
  }

  getMeals(): Observable<MealHttp[]> {
    return this.http.get<MealHttp[]>(`${this.baseApiEndpoint}meals`);
  }

  normalizeMeals = (mealHttps: MealHttp[]): {meals: Meal[], ingredientQuantities: IngredientQuantity[], ingredients: Ingredient[]} => {
     // Normalizes data and returns normalized array rather than array of nested objects
     const normalizedData = normalize({meals: mealHttps}, mealsSchema);
     const mealsData = normalizedData.result.meals.map(id => normalizedData.entities.meals[id]);
     // We have to return an array to LoadIngredientQuantities action, so we run through the normalized
     // ingredientQuantities object using Object.keys and convert it to an array of IngredientQuantity objects.
     const ingredientQuantitiesData = Object.keys(normalizedData.entities.ingredientQuantities)
     .map(key => normalizedData.entities.ingredientQuantities[key])
     .map(ingredientQuantity => {
        let clone: any = {...ingredientQuantity};
        delete clone.text;
        return clone;  // prevents duplicate text property from entering data store
      });

    const ingredientsDataArray = Object.keys(normalizedData.entities.ingredientQuantities)
     .map(key => normalizedData.entities.ingredientQuantities[key])
     .map(ingredientQuantity => ({id: ingredientQuantity.ingredientId, text: ingredientQuantity.text}));

     return {meals: mealsData, ingredientQuantities: ingredientQuantitiesData, ingredients: ingredientsDataArray};
  }

  updateMeal(meal: Meal): Observable<[HttpEvent<any>, [Meal, IngredientQuantity[]]]> {
    let denormalizedMeal: MealHttp;
    return combineLatest(
      [
        this.store.select(fromMeals.getIngredientQuantitiesForSelectedMeal),
        this.store.select(fromMeals.getAllIngredients),
        this.store.select(fromMeals.getSelectedMeal)
      ]).pipe(
        take(1),
        map(
          (res: any) => {
            const ingredientQuantities: IngredientQuantity[] = res[0];
            const ingredients: Ingredient[] = res[1];
            const selectedMeal: Meal = res[2];
            denormalizedMeal = {
              ...meal,
              ingredientQuantities: meal.ingredientQuantities.map(
                (ingredientQuantity: any) => {
                  const ingredientQuantityHttp: IngredientQuantityHttp = {
                    ...ingredientQuantity,
                    text: ingredients.filter(ingredient => ingredient.id === ingredientQuantity.ingredientId)[0].text
                  }

                  return ingredientQuantityHttp;
                }
              )
            }
            return denormalizedMeal;
          }),
        switchMap(denormalizedMeal => {
          return this.sendUpdateRequestsForIngredientQuantities(denormalizedMeal);
        }),
        switchMap((res: IngredientQuantityHttp[]) => {
          return this.addMissingIngredientQuantityIds(denormalizedMeal, res);
        }),
        map((ingredientQuantitiesToAdd: IngredientQuantityHttp[]) => {
          const resultsArray: [Meal, IngredientQuantity[]] = this.createNormalizedAndDenormalizedDataItemsToPersistInStoreAndServer(meal, denormalizedMeal, ingredientQuantitiesToAdd);
          return forkJoin(
            // Updates the meal on the server
            [this.http.put<MealHttp>(`${this.baseApiEndpoint}meals/${meal.id}`, denormalizedMeal).subscribe(),
            of(resultsArray)]
          )
        })
      )
  }

  /**
   * @description sendUpdateRequestsForIngredientQuantities is a helper method to update the json-server db
   * when a meal's Ingredient Quantities change. This would be unnecessary in a true relational db, but since
   * json-server does not provide any relationships between the JSON objects it stores we handle it here.
   * @param denormalizedMeal MealHttp
   */
  sendUpdateRequestsForIngredientQuantities = (denormalizedMeal) => {
    const iqObjects: IngredientQuantityHttp[] = denormalizedMeal.ingredientQuantities.map(iq => iq );
    const httpCallsArray: Observable<IngredientQuantityHttp>[] = iqObjects.map(iq => iq.id ? this.putIngredientQuantity(iq) : this.postIngredientQuantity(iq));
    return forkJoin(httpCallsArray);
  }

  /**
   * @description addMissingIngredientQuantityIds is a helper method to update the json-server db
   * when a meal's Ingredient Quantities change. This would be unnecessary in a true relational db, but since
   * json-server does not provide any relationships between the JSON objects it stores we handle it here.
   * @param denormalizedMeal MealHttp
   * @param res Array<IngredientQuantityHttp> - response from successful PUT/POST to server.
   */
  addMissingIngredientQuantityIds = (denormalizedMeal, res) => {
    // Finds what ingredientQuantities already have IDs in the requests sent to the server.
    const existingIngredientQuantityIds: number[] = denormalizedMeal.ingredientQuantities.map(iq => iq.id);
    // Filters the response to get the ingredientQuantity 
    const ingredientQuantitiesToAdd: IngredientQuantityHttp[] = res
      .filter(item => existingIngredientQuantityIds.indexOf(item.id)<0);
    return ingredientQuantitiesToAdd;
  }

  createNormalizedAndDenormalizedDataItemsToPersistInStoreAndServer = (
    meal,
    denormalizedMeal,
    ingredientQuantitiesToAdd
  ): [Meal, IngredientQuantity[]] => {
    // Filters the denormalized meal to only get the ingredientQuantities that have IDs
    let updatedIngredientQuantities: IngredientQuantityHttp[] = denormalizedMeal.ingredientQuantities.filter(iq => iq.id);
    // Adds each updated ingredient quantity that now has a new ID to the denormalized meal's ingredient quantities array
    if (ingredientQuantitiesToAdd instanceof Array) {
      ingredientQuantitiesToAdd.forEach((ingredientQuantity: IngredientQuantityHttp) => updatedIngredientQuantities.push(ingredientQuantity));
      // Resets the ingredientQuantities on the denormalized meal so that all Ingredient Quantities now have IDs.
      denormalizedMeal.ingredientQuantities = updatedIngredientQuantities;
    } else if (ingredientQuantitiesToAdd) {
      // Sometimes if there is only one Ingredient Quantity to add, we get an object instead of array. We make it an array.
      ingredientQuantitiesToAdd = [ingredientQuantitiesToAdd];
      ingredientQuantitiesToAdd.forEach((ingredientQuantity: IngredientQuantityHttp) => updatedIngredientQuantities.push(ingredientQuantity));
      // Resets the ingredientQuantities on the denormalized meal so that all Ingredient Quantities now have IDs.
      denormalizedMeal.ingredientQuantities = updatedIngredientQuantities;
    }
    // Returns the normalized meal, and normalized IngredientQuantities with IDs so that the Store can update.
    const myMeal: Meal = {
      ...meal,
      ingredientQuantities: JSON.parse( // clone the updatedIngredientQuantities using JSON methods to prevent updates due to references
        JSON.stringify(updatedIngredientQuantities)
      ).map(iq => {
        delete iq.text;
        return iq;
      })
    };
    const ingredientQuantitiesWithIds: IngredientQuantity[] = JSON.parse( // clone the updatedIngredientQuantities using JSON methods to prevent updates due to references
      JSON.stringify(updatedIngredientQuantities)
    ).map(iq => {
      delete iq.text;
      return iq;
    });
    return [
      myMeal,
      ingredientQuantitiesWithIds
    ];
  }

  putIngredientQuantity = (iq: IngredientQuantityHttp): Observable<IngredientQuantityHttp> => {
    return this.http.put<IngredientQuantityHttp>(`${this.baseApiEndpoint}ingredientQuantities/${iq.id}`, iq)
  }

  postIngredientQuantity = (iq: IngredientQuantityHttp): Observable<IngredientQuantityHttp> => {
    return this.http.post<IngredientQuantityHttp>(`${this.baseApiEndpoint}ingredientQuantities`, iq)
  }

}