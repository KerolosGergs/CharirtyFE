import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVideoSection } from './dashboard-video-section';

describe('DashboardVideoSection', () => {
  let component: DashboardVideoSection;
  let fixture: ComponentFixture<DashboardVideoSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardVideoSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardVideoSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
