import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealState } from './real-state';

describe('RealState', () => {
  let component: RealState;
  let fixture: ComponentFixture<RealState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
