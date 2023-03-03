import { TravelDestination } from './travel-destination.model';
import { Subject, BehaviorSubject } from "rxjs";

export class DestinationsApiClient {
	destinations: TravelDestination[];
	current: Subject<TravelDestination> = new BehaviorSubject<TravelDestination>(new TravelDestination("","", ""));
 	constructor() {
       this.destinations = [];
	}
	add(d: TravelDestination){
	  this.destinations.push(d);
	}
	getAll(){
	  return this.destinations;
    }
	getById(id: string): TravelDestination{
		return this.destinations.filter((d) => d.id.toString() === id)[0]
	}
	choose(d: TravelDestination){
		this.destinations.forEach(x => x.setSelected(false));
		d.setSelected(true);
		this.current.next(d);
	}
	subscribeOnChange(fn:any){
		this.current.subscribe(fn)
	}
}