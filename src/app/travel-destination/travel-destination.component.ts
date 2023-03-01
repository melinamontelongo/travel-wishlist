import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { TravelDestination } from '../models/travel-destination.model';
@Component({
  selector: 'app-travel-destination',
  templateUrl: './travel-destination.component.html',
  styleUrls: ['./travel-destination.component.css']
})
export class TravelDestinationComponent implements OnInit {
  @Input() destination!: TravelDestination;
  @HostBinding('attr.class') cssClass = 'col-md-4 mb-4';
  constructor(){
  }
  ngOnInit(){}
}
