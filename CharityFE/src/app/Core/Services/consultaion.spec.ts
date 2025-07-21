import { TestBed } from '@angular/core/testing';

import { Consultaion } from './consultaion';

describe('Consultaion', () => {
  let service: Consultaion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Consultaion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
