import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealComponent } from './meal/meal.component';
import { MealGuard } from './guards/meal.guard';

const routes: Routes = [
  { path: '',  component: MealListComponent},
  { path: ':id', component:  MealComponent, canActivate: [MealGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealRoutingModule { }
