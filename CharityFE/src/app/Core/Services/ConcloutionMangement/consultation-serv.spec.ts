import { TestBed } from '@angular/core/testing';

import { ConsultationServ } from './consultation-serv';

describe('ConsultationServ', () => {
  let service: ConsultationServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
