import { Component, InjectionToken, OnInit, Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/app.module';
import { DestinationsApiClient } from 'src/app/models/destinations-api-client.model';
import { TravelDestination } from 'src/app/models/travel-destination.model';
import { Store } from "@ngrx/store";
/* class DestinationsApiClientOld{
  getById(id: string): TravelDestination{
    console.log("calling old class");
    return null;
  }
}

interface AppConfig{
  apiEndpoint: string;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: "my_api.com"
};
const APP_CONFIG = new InjectionToken<AppConfig>("app.config"); */
/* @Injectable()
class DestinationsApiClientDecorated extends DestinationsApiClient{
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>){
    super(store);
  }
  getByIdNew(id: string): TravelDestination{
    console.log("calling by decorated class");
    console.log("config: " + this.config.apiEndpoint);
    return super.getById(id);
  }
} */

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.css'],
  providers: [DestinationsApiClient
/*     {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    {provide: DestinationsApiClient, useClass: DestinationsApiClientDecorated},
    {provide: DestinationsApiClientOld, useExisting: DestinationsApiClient} */
  ]
})
export class DestinationDetailComponent {
 destination: TravelDestination
  style = {
    sources:{
      world: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
      }
    },
    version: 0,
    layers: [{
      "id": "countries",
      "type": "fill",
      "source": "world",
      "layout": {},
      "paint": {
        "fill-color": "#6F788A"
      }
    }]
  };
 constructor(private route: ActivatedRoute, private destinationsApiClient: DestinationsApiClient/* DestinationsApiClientOld */ ) {}

 ngOnInit(){
  let id = this.route.snapshot.paramMap.get("id");
  this.destination = this.destinationsApiClient.getById(id);
 }
}
