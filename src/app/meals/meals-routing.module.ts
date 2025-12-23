import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MealListContainerComponent } from "@app/meals/container-components/meal-list-container/meal-list-container.component";
import { MealDetailsContainerComponent } from "@app/meals/container-components/meal-details-container/meal-details-container.component";
import { MealExistsGuard } from "@app/meals/guards/meal-exists.guard";
import { EditMealGuard } from "@app/meals/guards/edit-meal.guard";
import { EditMealContainerComponent } from "@app/meals/container-components/edit-meal-container/edit-meal-container.component";

export const routes: Routes = [
  {
    path: '',
    title: 'Meal List',
    component: MealListContainerComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    title: 'Meal Details',
    component: MealDetailsContainerComponent,
    canActivate: [MealExistsGuard]
  },
  {
    path: ':id/edit',
    title: 'Edit Meal',
    component: EditMealContainerComponent,
    canActivate: [EditMealGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
