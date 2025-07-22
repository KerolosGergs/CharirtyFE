import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVolunteer } from './dashboard-volunteer';

describe('DashboardVolunteer', () => {
  let component: DashboardVolunteer;
  let fixture: ComponentFixture<DashboardVolunteer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardVolunteer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardVolunteer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
