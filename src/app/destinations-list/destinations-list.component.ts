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
  updates: string[];
  constructor(public destinationsApiClient: DestinationsApiClient){
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinationsApiClient.subscribeOnChange((d: TravelDestination) => {
      if( d.name !== ""){
        this.updates.push("Se ha elegido a " + d.name);
      }
    })
  }
  added(d: TravelDestination) {
    this.destinationsApiClient.add(d);
    this.onItemAdded.emit(d);
  }
  chosen(c: TravelDestination){
    this.destinationsApiClient.choose(c);
  }
}
