import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsListComponent } from './meals-list/meals-list.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatList } from '@angular/material';
import { MealsRoutingModule } from './meals-routing.module';
import { MealComponent } from './meal/meal.component';
import { MyMaterialModule } from '../my-material/my-material.module';
import { EditMealContainerComponent } from './edit-meal-container/edit-meal-container.component';
import { EditMealComponent } from './edit-meal-container/edit-meal/edit-meal.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    MealsRoutingModule
  ],
  declarations: [ MealsListComponent, MealComponent, EditMealContainerComponent, EditMealComponent]
})
export class MealsModule { }
