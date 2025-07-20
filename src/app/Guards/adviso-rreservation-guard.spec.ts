import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { advisoRreservationGuard } from './adviso-rreservation-guard';

describe('advisoRreservationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => advisoRreservationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
