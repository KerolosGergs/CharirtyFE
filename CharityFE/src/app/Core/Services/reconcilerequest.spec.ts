import { TestBed } from '@angular/core/testing';

import { Reconcilerequest } from './reconcilerequest';

describe('Reconcilerequest', () => {
  let service: Reconcilerequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reconcilerequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
