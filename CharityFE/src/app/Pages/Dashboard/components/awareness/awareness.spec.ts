import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Awareness } from './awareness';

describe('Awareness', () => {
  let component: Awareness;
  let fixture: ComponentFixture<Awareness>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Awareness]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Awareness);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
