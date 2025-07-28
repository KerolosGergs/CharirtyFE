import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernanceEvaluation } from './governance-evaluation';

describe('GovernanceEvaluation', () => {
  let component: GovernanceEvaluation;
  let fixture: ComponentFixture<GovernanceEvaluation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovernanceEvaluation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernanceEvaluation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
