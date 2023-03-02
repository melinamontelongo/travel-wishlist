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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DestinationsListComponent },
  { path: 'destination', component: DestinationDetailComponent },
]

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
    RouterModule.forRoot(routes)
  ],
  providers: [
    DestinationsApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
