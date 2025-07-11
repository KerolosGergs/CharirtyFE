import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdvisorsDetails } from './dashboard-advisors-details';

describe('DashboardAdvisorsDetails', () => {
  let component: DashboardAdvisorsDetails;
  let fixture: ComponentFixture<DashboardAdvisorsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdvisorsDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAdvisorsDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
