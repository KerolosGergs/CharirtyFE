import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRequest } from './dashboard-request';

describe('DashboardRequest', () => {
  let component: DashboardRequest;
  let fixture: ComponentFixture<DashboardRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
