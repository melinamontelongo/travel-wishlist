import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { TravelDestination } from '../../models/travel-destination.model';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.module";
import { VoteUpAction, VoteDownAction } from '../../models/travel-destination-state.model';
import { trigger, state, style, transition, animate } from "@angular/animations"

@Component({
  selector: 'app-travel-destination',
  templateUrl: './travel-destination.component.html',
  styleUrls: ['./travel-destination.component.css'],
  animations: [
    trigger("isFavorite", [
      state("favoriteState", style({
        backgroundColor: "PaleTurquoise"
      })),
      state("notFavoriteState", style({
        backgroundColor: "WhiteSmoke"
      })),
      transition("notFavoriteState => favoriteState", [
        animate("3s")
      ]),
      transition("favoriteState => notFavoriteState", [
        animate("1s")
      ])
    ])
  ]
})
export class TravelDestinationComponent implements OnInit {
  @Input() destination!: TravelDestination;
  @Input() position!: number;
  @HostBinding('attr.class') cssClass = 'col-md-4 mb-4';
  @Output() clicked: EventEmitter<TravelDestination>
  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
  }
  ngOnInit() { }

  go() {
    this.clicked.emit(this.destination)
    return false;
  }
  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destination))
    return false;
  }
  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destination))
    return false;
  }
}
