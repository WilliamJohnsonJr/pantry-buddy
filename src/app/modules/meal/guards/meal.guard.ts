import { CanActivate } from "@angular/router/src/interfaces";
import { Store } from "@ngrx/store";
import { ActivatedRouteSnapshot } from "@angular/router/src/router_state";
import { Injectable } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import { tap, map, merge, take, switchMap, filter } from 'rxjs/operators';
import { State } from '@state/reducers';
import { selectCurrentMeal } from '@state/reducers/index';

@Injectable({
    providedIn: 'root'
  })
export class MealGuard implements CanActivate {

    constructor(private store: Store<State>) { }

    canActivate(route: ActivatedRouteSnapshot) {
        let mealId = route.paramMap.get('id');
        
        return this.store.select(selectCurrentMeal).pipe(
            filter(meal => !!meal),
            take(1),
            map(meal => !!meal)
        )
    }
}