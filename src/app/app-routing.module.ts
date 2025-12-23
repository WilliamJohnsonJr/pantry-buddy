import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { HomeComponent } from './core/components/home/home.component';

const appRoutes: Routes = [

  { path: '', title: 'Home', component: HomeComponent},
  {
    path: 'meals',
    title: 'Meals',
    loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule)
  },
  { path: '**', title: 'Not Found', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only - logs, among other things, all router events in the console
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
