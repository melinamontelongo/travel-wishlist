import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { TravelDestination } from "./travel-destination.model";
import { HttpClientModule } from "@angular/common/http";

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
    CHOSEN_AS_FAV = "[Travel Destinations] chosen as favorite",
    VOTE_UP = "[Travel Destinations] Vote Up",
    VOTE_DOWN = "[Travel Destinations] Vote Down",
    DELETE_DESTINATION = "[Travel Destinations] Delete",
    INIT_MY_DATA = "[Travel Destinations] Init My Data"
}

export class NewTravelDestinationAction implements Action {
    type = TravelDestinationActionTypes.NEW_DESTINATION;
    constructor(public destination: TravelDestination) { };
}
export class DeleteTravelDestinationAction implements Action {
    type = TravelDestinationActionTypes.DELETE_DESTINATION;
    constructor(public destination: TravelDestination) { };
}
export class ChosenTravelDestinationAction implements Action {
    type = TravelDestinationActionTypes.CHOSEN_AS_FAV;
    constructor(public destination: TravelDestination) { };
}

export class VoteUpAction implements Action {
    type = TravelDestinationActionTypes.VOTE_UP;
    constructor(public destination: TravelDestination) { };
}

export class VoteDownAction implements Action {
    type = TravelDestinationActionTypes.VOTE_DOWN;
    constructor(public destination: TravelDestination) { };
}

export class InitMyDataAction implements Action {
    type = TravelDestinationActionTypes.INIT_MY_DATA;
    constructor(public destinations: string[]){}
}
export type TravelDestinationActions = NewTravelDestinationAction | DeleteTravelDestinationAction |ChosenTravelDestinationAction | VoteUpAction | VoteDownAction | InitMyDataAction;

//REDUCERS
export function TravelDestinationReducer(
    state: TravelDestinationState,
    action: TravelDestinationActions
): TravelDestinationState {
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
        case TravelDestinationActionTypes.VOTE_UP: {
            const d: TravelDestination = (action as VoteUpAction).destination;
            d.voteUp();
            return { ...state };
        }
        case TravelDestinationActionTypes.VOTE_DOWN: {
            const d: TravelDestination = (action as VoteDownAction).destination;
            d.voteDown();
            return { ...state };
        }
        case TravelDestinationActionTypes.INIT_MY_DATA: {
            const destinations: string[] = (action as InitMyDataAction).destinations;
            return{
                ...state,
                items: destinations.map((d) => new TravelDestination(d, "", ""))
            }
        }
        default:
            return state;
    }
}

//EFFECTS
@Injectable()
export class TravelDestinationEffects {
    newAdded$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TravelDestinationActionTypes.NEW_DESTINATION),
            map((action: NewTravelDestinationAction) => new ChosenTravelDestinationAction(action.destination))
        )
    )
    constructor(private actions$: Actions) { }
}