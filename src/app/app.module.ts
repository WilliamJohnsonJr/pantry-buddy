// Config
import { API_ENDPOINT } from './app.tokens';
import { environment } from '../environments/environment';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatList } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { MyMaterialModule } from './modules/my-material/my-material.module';

// Reducers
import { ROOT_REDUCER, META_REDUCERS } from './state/app.state';

// Facades
import { MealFacade } from './state/meal/meal.facade';

// Components
import { AppComponent } from './app.component';
import { MyNavComponent } from './shared/my-nav/my-nav.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './shared/home/home.component';
import { CommonModule } from '@angular/common';
import { BaseService } from './services/base.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { httpInterceptorProviders } from './interceptors/index';


@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    PageNotFoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MyMaterialModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    /*
      ngrx uses `combineReducers()` to create the next state from a single root reducer.
      The meta-reducers array is taken from right-to-left to make one meta-reducer, then combineReducers is
      called to create the next state.
    */
     StoreModule.forRoot(ROOT_REDUCER, {
      metaReducers: META_REDUCERS
    }),
    EffectsModule.forRoot([MealFacade ]),
    StoreDevtoolsModule.instrument({ maxAge: 15, name: 'Pantry Buddy' }),
    // !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 20, name: 'Pantry Buddy' }) : []

  ],
  providers: [
    httpInterceptorProviders,
    { provide: API_ENDPOINT, useValue: 'http://localhost:3000/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }