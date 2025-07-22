import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconcileDashboard } from './reconcile-dashboard';

describe('ReconcileDashboard', () => {
  let component: ReconcileDashboard;
  let fixture: ComponentFixture<ReconcileDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReconcileDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconcileDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
