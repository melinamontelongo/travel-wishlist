import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { TravelDestination } from '../models/travel-destination.model';

@Component({
  selector: 'app-travel-destination-form',
  templateUrl: './travel-destination-form.component.html',
  styleUrls: ['./travel-destination-form.component.css']
})
export class TravelDestinationFormComponent implements OnInit{
  @Output() onItemAdded: EventEmitter<TravelDestination>;
  fg: FormGroup;
  minLength = 5;
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
      console.log("the form has changed ",form)
    })
  }
  ngOnInit(){
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
