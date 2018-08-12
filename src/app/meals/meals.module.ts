import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from '../my-material/my-material.module';
import { MealListComponent } from './components/meal-list/meal-list.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  declarations: [MealListComponent]
})
export class MealsModule { }
