import { Component } from '@angular/core';
import { BookingsApiClientService } from '../bookings-api-client.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css']
})
export class BookingsListComponent {
  constructor(public api: BookingsApiClientService){}
}
