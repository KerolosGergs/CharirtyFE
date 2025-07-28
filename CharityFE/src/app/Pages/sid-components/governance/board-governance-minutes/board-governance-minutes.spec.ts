import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGovernanceMinutes } from './board-governance-minutes';

describe('BoardGovernanceMinutes', () => {
  let component: BoardGovernanceMinutes;
  let fixture: ComponentFixture<BoardGovernanceMinutes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardGovernanceMinutes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGovernanceMinutes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
