import { TestBed } from '@angular/core/testing';

import { FibreServiceService } from './fibre-service.service';

describe('FibreServiceService', () => {
  let service: FibreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FibreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
