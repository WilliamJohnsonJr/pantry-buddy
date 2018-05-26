import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './shared/home/home.component';
 
const appRoutes: Routes = [
  
  { path: '', component: HomeComponent},
  {
    path: 'meals',
    loadChildren: './modules/meals/meals.module#MealsModule'
  },
  { path: '**', component: PageNotFoundComponent }
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
