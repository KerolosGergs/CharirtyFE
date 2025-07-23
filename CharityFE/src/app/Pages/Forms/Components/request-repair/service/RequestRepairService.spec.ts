import { TestBed } from '@angular/core/testing';

import { RequestRepairService } from './RequestRepairService';

describe('HelpService', () => {
  let service: RequestRepairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestRepairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
