import { TestBed } from '@angular/core/testing';

import { CallenderService } from './callender-service';

describe('CallenderService', () => {
  let service: CallenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
