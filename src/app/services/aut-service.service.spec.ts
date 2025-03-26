import { TestBed } from '@angular/core/testing';

import { AutServiceService } from './aut-service.service';

describe('AutServiceService', () => {
  let service: AutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
