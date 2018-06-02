import { CanActivate } from "@angular/router/src/interfaces";
import { Store } from "@ngrx/store";
import { ActivatedRouteSnapshot } from "@angular/router/src/router_state";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, map, merge, take, switchMap, filter } from 'rxjs/operators';
import { MealFacade } from "@state/meal/meal.facade";

@Injectable({
    providedIn: 'root'
  })
export class MealGuard implements CanActivate {

    constructor(private MealFacade: MealFacade) { }

    canActivate(route: ActivatedRouteSnapshot) {
        let mealId = route.paramMap.get('id');
        return this.MealFacade.getMealDetails(mealId).pipe(
            filter(meal => !!meal),
            take(1),
            map(meal => !!meal)
        )
    }
}