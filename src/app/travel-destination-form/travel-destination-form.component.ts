import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { TravelDestination } from '../models/travel-destination.model';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

@Component({
  selector: 'app-travel-destination-form',
  templateUrl: './travel-destination-form.component.html',
  styleUrls: ['./travel-destination-form.component.css']
})
export class TravelDestinationFormComponent implements OnInit{
  @Output() onItemAdded: EventEmitter<TravelDestination>;
  fg: FormGroup;
  minLength = 3;
  searchResults: string[] = [];

  constructor(fb: FormBuilder) { 
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      name: ['', Validators.compose([
        Validators.required,
        this.nameValidatorParams(this.minLength)
      ])],
      url: [''],
      description: ['', Validators.required]
    })
    this.fg.valueChanges.subscribe((form:any) => {
      console.log("the form has changed ", form)
    })
  }
  ngOnInit(){
    let elemName = <HTMLInputElement>document.getElementById("name");
    //observable de eventos
    fromEvent<KeyboardEvent>(elemName, "input")
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length >= 4),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(() => ajax("/assets/data.json"))
      ).subscribe(ajaxResponse => {
        this.searchResults = ajaxResponse.response as string[];
      })
  }

  save(name: string, url: string, description:string): boolean {
    const d = new TravelDestination(name, url, description);
    this.onItemAdded.emit(d);
    return false;
  }

  nameValidator(control: FormControl):{ [s: string]: boolean } | null{
    console.log(control)
    let controlLength = control.value.toString().trim().length;
    if(controlLength > 0 && controlLength < 5){
      return { invalidName: true }
    }
    return null;
  }
  nameValidatorParams(minLength: number): ValidatorFn { 
    return (control: AbstractControl): ValidationErrors | null => {
      let controlLength = control.value.toString().trim().length;
      if(controlLength > 0 && controlLength < minLength){
        return { minLengthName: true }
      }
      return null;
    }
  }
}
