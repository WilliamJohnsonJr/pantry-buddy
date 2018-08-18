import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MealListContainerComponent } from "@app/meals/container-components/meal-list-container/meal-list-container.component";

export const routes: Routes = [
  {
    path: '',
    component: MealListContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
