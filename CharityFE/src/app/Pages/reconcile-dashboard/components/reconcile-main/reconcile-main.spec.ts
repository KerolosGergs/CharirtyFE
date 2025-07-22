import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconcileMain } from './reconcile-main';

describe('ReconcileMain', () => {
  let component: ReconcileMain;
  let fixture: ComponentFixture<ReconcileMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReconcileMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconcileMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
