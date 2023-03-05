import { TestBed } from '@angular/core/testing';

import { BookingsApiClientService } from './bookings-api-client.service';

describe('BookingsApiClientService', () => {
  let service: BookingsApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingsApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
