import { Volunteer } from './../../../../Dashboard/components/dashboard-volunteer/Model/Volunteer-request.model';
import { TestBed } from '@angular/core/testing';

import { VolunteerService } from './VolunteerService';

describe('HelpService', () => {
  let service: VolunteerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
