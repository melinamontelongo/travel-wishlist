import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { TravelDestination } from "./travel-destination.model";

//STATE
export interface TravelDestinationState {
    items: TravelDestination[];
    loading: boolean;
    favorite: TravelDestination;
}

export const initializeTravelDestinationState = () => {
    return {
        items: [],
        loading: false,
        favorite: null
    }
}

//ACTIONS
export enum TravelDestinationActionTypes {
    NEW_DESTINATION = "New [Travel Destinations]",
    CHOSEN_AS_FAV = "[Travel Destinations] chosen as favorite"
}

export class NewTravelDestinationAction implements Action {
    type = TravelDestinationActionTypes.NEW_DESTINATION;
    constructor(public destination: TravelDestination) { };
}

export class ChosenTravelDestinationAction implements Action {
    type = TravelDestinationActionTypes.CHOSEN_AS_FAV;
    constructor(public destination: TravelDestination) { };
}

export type TravelDestinationActions = NewTravelDestinationAction | ChosenTravelDestinationAction;

//REDUCERS
export function TravelDestinationReducer(
    state: TravelDestinationState,
    action: TravelDestinationActions
) {
    switch (action.type) {
        case TravelDestinationActionTypes.NEW_DESTINATION: {
            return {
                ...state,
                items: [...state.items, (action as NewTravelDestinationAction).destination]
            };
        }
        case TravelDestinationActionTypes.CHOSEN_AS_FAV: {
            state.items.forEach(x => x.setSelected(false));
            const fav: TravelDestination = (action as ChosenTravelDestinationAction).destination;
            fav.setSelected(true);
            return {
                ...state,
                favorite: fav
            };
        }
        default:
            return {...state};
    }
}

//EFFECTS
@Injectable()
export class TravelDestinationEffects{
    newAdded$ = createEffect(() => 
        this.actions$.pipe(
            ofType(TravelDestinationActionTypes.NEW_DESTINATION),
            map((action: NewTravelDestinationAction) => new ChosenTravelDestinationAction(action.destination))
        )
    )
    constructor(private actions$: Actions){}
}