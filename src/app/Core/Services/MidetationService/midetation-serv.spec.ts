import { TestBed } from '@angular/core/testing';

import { MidetationServ } from './midetation-serv';

describe('MidetationServ', () => {
  let service: MidetationServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MidetationServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
