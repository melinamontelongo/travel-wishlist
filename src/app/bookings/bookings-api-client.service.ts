import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingsApiClientService {

  constructor() { }

  getAll(){
    return [{id: 1, name: "one"}, {id: 2, name: "two"}]
  }
}
