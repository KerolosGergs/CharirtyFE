import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDuties } from './board-duties';

describe('BoardDuties', () => {
  let component: BoardDuties;
  let fixture: ComponentFixture<BoardDuties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDuties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDuties);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
