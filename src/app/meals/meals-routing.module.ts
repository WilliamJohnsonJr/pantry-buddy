import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MealListContainerComponent } from "@app/meals/container-components/meal-list-container/meal-list-container.component";
import { MealDetailsContainerComponent } from "@app/meals/container-components/meal-details-container/meal-details-container.component";
import { MealExistsGuard } from "@app/meals/guards/meal-exists.guard";

export const routes: Routes = [
  {
    path: '',
    component: MealListContainerComponent
  },
  {
    path: ':id',
    component: MealDetailsContainerComponent,
    canActivate: [MealExistsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
