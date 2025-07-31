import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalPlan } from './operational-plan';

describe('OperationalPlan', () => {
  let component: OperationalPlan;
  let fixture: ComponentFixture<OperationalPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationalPlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalPlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
