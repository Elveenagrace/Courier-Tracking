import { TestBed } from '@angular/core/testing';

import { CourierServicesService } from './courier-services.service';

describe('CourierServicesService', () => {
  let service: CourierServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourierServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
