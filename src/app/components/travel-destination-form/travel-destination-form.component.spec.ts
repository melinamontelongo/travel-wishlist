import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDestinationFormComponent } from './travel-destination-form.component';

describe('TravelDestinationFormComponent', () => {
  let component: TravelDestinationFormComponent;
  let fixture: ComponentFixture<TravelDestinationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelDestinationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelDestinationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
