import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from '@app/my-material/my-material.module';
import { MealListComponent } from '@app/meals/components/meal-list/meal-list.component';
import { MealsRoutingModule } from '@app/meals/meals-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/meals/reducers';
import { MealEffects } from '@app/meals/effects/meal.effects';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { MealListContainerComponent } from './container-components/meal-list-container/meal-list-container.component';
import { MealDetailsContainerComponent } from './container-components/meal-details-container/meal-details-container.component';
import { MealDetailsComponent } from './components/meal-details/meal-details.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MyMaterialModule,
    MealsRoutingModule,
    StoreModule.forFeature('meals', reducers),
    EffectsModule.forFeature([MealEffects])
  ],
  declarations: [MealListComponent, MealListContainerComponent, MealDetailsContainerComponent, MealDetailsComponent]
})
export class MealsModule { }
