import { CanActivate } from "@angular/router/src/interfaces";
import { Store } from "@ngrx/store";
import { ActivatedRouteSnapshot } from "@angular/router/src/router_state";
import { Injectable } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import { tap, map, merge, take, switchMap, filter, mergeMap } from 'rxjs/operators';
import { State } from '@state/reducers';
import { selectCurrentMeal } from '@state/reducers/index';
import { selectAllMeals, selectCurrentMealId } from '../../../state/reducers/index';
import { AddMeal, SelectMeal, LoadMeal } from '../../../state/meal/meal.actions';
import { Meal } from '@state/meal/meal.model';

@Injectable({
    providedIn: 'root'
  })
export class MealGuard implements CanActivate {
    constructor(private store: Store<State>) { }
    
    canActivate(route: ActivatedRouteSnapshot) {
        let mealId = route.paramMap.get('id');
        this.store.dispatch(new SelectMeal(mealId));
        return this.store.select(selectCurrentMeal).pipe(
            filter(meal => !!meal),
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
        return this.store.select(selectAllMeals).pipe(
            filter(meals => !!meals),
            take(1),
            map(meals => !!meals)
        )
    }
}