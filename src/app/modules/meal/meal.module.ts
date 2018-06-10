import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealListComponent } from './meal-list/meal-list.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatList } from '@angular/material';
import { MealRoutingModule } from './meal-routing.module';
import { MealComponent } from './meal/meal.component';
import { MyMaterialModule } from '../my-material/my-material.module';
import { EditMealContainerComponent } from './edit-meal-container/edit-meal-container.component';
import { EditMealComponent } from './edit-meal-container/edit-meal/edit-meal.component';
import { EditIngredientsComponent } from './edit-meal-container/edit-meal/edit-ingredients/edit-ingredients.component';
import { IngredientAutocompleteComponent } from './edit-meal-container/edit-meal/edit-ingredients/ingredient-autocomplete/ingredient-autocomplete.component';
import { CoreModule } from '../core/core.module';
import { IngredientDisplayComponent } from './meal/ingredient-display/ingredient-display.component';
import { StoreModule } from '@ngrx/store';
import {reducer} from '@state/meal/meal.reducer'

@NgModule({
  imports: [CommonModule, CoreModule, MealRoutingModule],
  declarations: [
    MealListComponent,
    MealComponent,
    EditMealContainerComponent,
    EditMealComponent,
    EditIngredientsComponent,
    IngredientAutocompleteComponent,
    IngredientDisplayComponent
  ]
})
export class MealModule {}
