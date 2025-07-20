import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddNews } from './dashboard-add-news';

describe('DashboardAddNews', () => {
  let component: DashboardAddNews;
  let fixture: ComponentFixture<DashboardAddNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddNews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
