import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealsListComponent } from './meals-list/meals-list.component';
import { MealComponent } from './meal/meal.component';
import { MealGuard } from './guards/meal.guard';

const routes: Routes = [
  { path: '',  component: MealsListComponent},
  { path: ':id', component:  MealComponent, canActivate: [MealGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsRoutingModule { }
