import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardMembers } from './board-members';

describe('BoardMembers', () => {
  let component: BoardMembers;
  let fixture: ComponentFixture<BoardMembers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardMembers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardMembers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
