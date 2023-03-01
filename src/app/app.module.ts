import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TravelDestinationComponent } from './travel-destination/travel-destination.component';
import { DestinationsListComponent } from './destinations-list/destinations-list.component';
import { DestinationDetailComponent } from './destination-detail/destination-detail.component';

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

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
