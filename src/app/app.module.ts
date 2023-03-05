import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TravelDestinationComponent } from './components/travel-destination/travel-destination.component';
import { DestinationsListComponent } from './components/destinations-list/destinations-list.component';
import { DestinationDetailComponent } from './components/destination-detail/destination-detail.component';
import { TravelDestinationFormComponent } from './components/travel-destination-form/travel-destination-form.component';
import { DestinationsApiClient } from './models/destinations-api-client.model';
import { initializeTravelDestinationState, TravelDestinationEffects, TravelDestinationReducer, TravelDestinationState } from './models/travel-destination-state.model';
import { ActionReducerMap, StoreModule as NgRxStoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { LoggedUserGuard } from './guards/logged-user/logged-user.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DestinationsListComponent },
  { path: 'destination', component: DestinationDetailComponent },
  {path: "login", component: LoginComponent},
  {path: "protected", component: ProtectedComponent, canActivate: [LoggedUserGuard]}
]

//Redux init start
export interface AppState {
  destinations: TravelDestinationState;
}

const reducers: ActionReducerMap<AppState> = {
  destinations: TravelDestinationReducer
}

const reducersInitialState = {
  destinations: initializeTravelDestinationState()
}

//Redux init end

@NgModule({
  declarations: [
    AppComponent,
    TravelDestinationComponent,
    DestinationsListComponent,
    DestinationDetailComponent,
    TravelDestinationFormComponent,
    LoginComponent,
    ProtectedComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState} ),
    EffectsModule.forRoot([TravelDestinationEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    DestinationsApiClient,
    AuthService,
    LoggedUserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
