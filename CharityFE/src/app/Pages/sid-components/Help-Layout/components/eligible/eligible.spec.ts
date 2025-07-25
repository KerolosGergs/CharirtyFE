import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eligible } from './eligible';

describe('Eligible', () => {
  let component: Eligible;
  let fixture: ComponentFixture<Eligible>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eligible]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eligible);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
