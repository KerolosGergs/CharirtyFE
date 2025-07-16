import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEditNews } from './dashboard-edit-news';

describe('DashboardEditNews', () => {
  let component: DashboardEditNews;
  let fixture: ComponentFixture<DashboardEditNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEditNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEditNews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
