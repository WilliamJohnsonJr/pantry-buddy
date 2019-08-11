import { CanActivate } from "@angular/router/src/interfaces";
import { select, Store } from "@ngrx/store";
import { ActivatedRouteSnapshot } from "@angular/router/src/router_state";
import { Injectable } from "@angular/core";
import { Observable, combineLatest, of } from "rxjs";
import { tap, map, merge, take, switchMap, filter, mergeMap, catchError } from 'rxjs/operators';
import { State, getMealsLoaded } from '@state/reducers';
import { selectCurrentMeal } from '@state/reducers/index';
import { selectAllMeals, selectCurrentMealId } from '../../../state/reducers/index';
import { MealService } from '@app/services/meal.service';
import * as mealActions from '@state/meal/meal.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { Meal } from "@app/state/meal/meal.model";


@Injectable({
    providedIn: 'root'
  })
export class MealGuard implements CanActivate {
    constructor(
      private store: Store<State>,
    ) {}

      canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.store.dispatch(new mealActions.SelectMeal(route.paramMap.get('id')));
        return this.store.select(selectCurrentMeal).pipe(
          filter((meal: Meal): boolean => !!meal),
          take(1),
          map(meal => !!meal)
        )
      }
}

@Injectable({
    providedIn: 'root'
  })
export class MealsGuard implements CanActivate {

    constructor(private store: Store<State>) { }

    canActivate(route: ActivatedRouteSnapshot) {
        this.store.dispatch(new mealActions.HttpGETMeals());
        return this.store.select(selectAllMeals).pipe(
            filter(meals => !!meals),
            take(1),
            map(meals => !!meals)
        )
    }
}