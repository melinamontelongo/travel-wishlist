import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { BookingsDetailsComponent } from './bookings-details/bookings-details.component';
import { BookingsApiClientService } from "./bookings-api-client.service";

@NgModule({
  declarations: [
    BookingsListComponent,
    BookingsDetailsComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule
  ],
  providers: [
    BookingsApiClientService
  ]
})
export class BookingsModule { }
