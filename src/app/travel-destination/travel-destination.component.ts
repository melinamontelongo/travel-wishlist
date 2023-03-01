import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { TravelDestination } from '../models/travel-destination.model';
@Component({
  selector: 'app-travel-destination',
  templateUrl: './travel-destination.component.html',
  styleUrls: ['./travel-destination.component.css']
})
export class TravelDestinationComponent implements OnInit {
  @Input() destination!: TravelDestination;
  @Input() position!: number;
  @HostBinding('attr.class') cssClass = 'col-md-4 mb-4';
  @Output() clicked: EventEmitter<TravelDestination>
  constructor(){
    this.clicked = new EventEmitter();
  }
  ngOnInit(){}

  go(){
    this.clicked.emit(this.destination)
    return false;
  }
}
