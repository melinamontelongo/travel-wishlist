import { Component } from '@angular/core';
import { TravelDestination } from "../models/travel-destination.model";

@Component({
  selector: 'app-destinations-list',
  templateUrl: './destinations-list.component.html',
  styleUrls: ['./destinations-list.component.css']
})
export class DestinationsListComponent {
  destinations: TravelDestination[];
  constructor(){
    this.destinations = []
  }
  save(name:string, url:string, description:string):boolean{
    this.destinations.push(new TravelDestination(name, url, description))
    return false;
  }
}
