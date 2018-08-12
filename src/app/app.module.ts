// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MyMaterialModule } from './my-material/my-material.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';

// Tokens
import { BASE_API_ENDPOINT } from './app.tokens';

// Interceptors
import { httpInterceptorProviders } from './interceptors';

// Reducers

// Components
import { AppComponent } from './app.component';
import { AppNavShellComponent } from './app-nav-shell/app-nav-shell.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { HomeComponent } from './core/components/home/home.component';
import { reducers, metaReducers } from './reducers';



@NgModule({
  declarations: [
    AppComponent,
    AppNavShellComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MyMaterialModule,
    LayoutModule,
    /*
      ngrx uses `combineReducers()` to create the next state from a single root reducer.
      The meta-reducers array is taken from right-to-left to make one meta-reducer, then combineReducers is
      called to create the next state.
    */
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]), // Place effects here
    StoreDevtoolsModule.instrument({ maxAge: 15, name: 'Pantry Buddy' }),
],
providers: [
  httpInterceptorProviders,
  { provide: BASE_API_ENDPOINT, useValue: 'http://localhost:3000/' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
