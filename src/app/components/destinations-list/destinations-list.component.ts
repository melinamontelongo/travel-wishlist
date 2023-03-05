import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TravelDestination } from "../../models/travel-destination.model";
import { DestinationsApiClient } from '../../models/destinations-api-client.model';
import { ChosenTravelDestinationAction, NewTravelDestinationAction } from "../../models/travel-destination-state.model";
import { AppState } from '../../app.module';
@Component({
  selector: 'app-destinations-list',
  templateUrl: './destinations-list.component.html',
  styleUrls: ['./destinations-list.component.css']
})
export class DestinationsListComponent {
  @Output() onItemAdded:EventEmitter<TravelDestination>;
  updates: string[];
  all;

  constructor(public destinationsApiClient: DestinationsApiClient, private store: Store<AppState>){
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinations.favorite)
      .subscribe(d => {
        if( d != null){
          this.updates.push("Se ha elegido a " + d.name);
        }
      });
      this.all = store.select(state => state.destinations.items).subscribe(items => this.all = items);
  }
  added(d: TravelDestination) {
    this.destinationsApiClient.add(d);
    this.onItemAdded.emit(d);
  }
  chosen(c: TravelDestination){
    this.destinationsApiClient.choose(c);
  }
}
