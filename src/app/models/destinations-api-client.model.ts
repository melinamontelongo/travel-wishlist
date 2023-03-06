import { TravelDestination } from './travel-destination.model';
import { Subject, BehaviorSubject } from "rxjs";
import { Store } from '@ngrx/store';
import { AppConfig, AppState, APP_CONFIG, db } from '../app.module';
import { ChosenTravelDestinationAction, NewTravelDestinationAction } from './travel-destination-state.model';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";

@Injectable()
export class DestinationsApiClient {
	constructor(private store: Store<AppState>, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig, private http: HttpClient) {}
	add(d: TravelDestination){
	 	const headers: HttpHeaders = new HttpHeaders({"X-API-TOKEN": "security-token"});
		const req = new HttpRequest("POST", this.config.apiEndpoint + "/my", {new: d.name}, {headers: headers});
		this.http.request(req).subscribe((data: HttpResponse<{}>) => {
			if(data.status === 200){
				this.store.dispatch(new NewTravelDestinationAction(d));
				const myDb = db;
				myDb.destinations.add(d);
				console.log("all db's destinations");
				//base de datos, tabla, query = devuelve una promesa
				myDb.destinations.toArray().then(destinations => console.log(destinations))
			}
		})
	}
	choose(d: TravelDestination){
		this.store.dispatch(new ChosenTravelDestinationAction(d))
	}
	getById(id: string): any{
		return false;
	}
}