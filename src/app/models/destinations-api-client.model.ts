import { TravelDestination } from './travel-destination.model';
import { Subject, BehaviorSubject } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { ChosenTravelDestinationAction, NewTravelDestinationAction } from './travel-destination-state.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinationsApiClient {
	constructor(private store: Store<AppState>) {}
	add(d: TravelDestination){
	 	this.store.dispatch(new NewTravelDestinationAction(d))
	}
	choose(d: TravelDestination){
		this.store.dispatch(new ChosenTravelDestinationAction(d))
	}
}