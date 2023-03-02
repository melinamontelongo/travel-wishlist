import { Component, Output, EventEmitter } from '@angular/core';
import { TravelDestination } from "../models/travel-destination.model";
import { DestinationsApiClient } from './../models/destinations-api-client.model';

@Component({
  selector: 'app-destinations-list',
  templateUrl: './destinations-list.component.html',
  styleUrls: ['./destinations-list.component.css']
})
export class DestinationsListComponent {
  @Output() onItemAdded:EventEmitter<TravelDestination>;
  constructor(public destinationsApiClient: DestinationsApiClient){
    this.onItemAdded = new EventEmitter();
  }
  added(d: TravelDestination) {
    this.destinationsApiClient.add(d);
    this.onItemAdded.emit(d);
  }
  chosen(c: TravelDestination){
    this.destinationsApiClient.getAll().forEach(x => x.setSelected(false));
    c.setSelected(true);
  }
}
