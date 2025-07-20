import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorDetails } from './advisor-details';

describe('AdvisorDetails', () => {
  let component: AdvisorDetails;
  let fixture: ComponentFixture<AdvisorDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisorDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisorDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
