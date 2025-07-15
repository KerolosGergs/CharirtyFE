import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDate } from './dashboard-date';

describe('DashboardDate', () => {
  let component: DashboardDate;
  let fixture: ComponentFixture<DashboardDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
