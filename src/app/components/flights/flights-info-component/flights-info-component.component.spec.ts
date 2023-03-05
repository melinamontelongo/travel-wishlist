import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsInfoComponentComponent } from './flights-info-component.component';

describe('FlightsInfoComponentComponent', () => {
  let component: FlightsInfoComponentComponent;
  let fixture: ComponentFixture<FlightsInfoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsInfoComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
