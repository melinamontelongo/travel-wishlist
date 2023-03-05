import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TravelDestinationComponent } from './travel-destination/travel-destination.component';
import { DestinationsListComponent } from './destinations-list/destinations-list.component';
import { DestinationDetailComponent } from './destination-detail/destination-detail.component';
import { TravelDestinationFormComponent } from './travel-destination-form/travel-destination-form.component';
import { DestinationsApiClient } from './models/destinations-api-client.model';
import { initializeTravelDestinationState, TravelDestinationEffects, TravelDestinationReducer, TravelDestinationState } from './models/travel-destination-state.model';
import { ActionReducerMap, StoreModule as NgRxStoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DestinationsListComponent },
  { path: 'destination', component: DestinationDetailComponent },
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
    DestinationsApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
