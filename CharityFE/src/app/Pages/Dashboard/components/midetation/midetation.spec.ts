import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Midetation } from './midetation';

describe('Midetation', () => {
  let component: Midetation;
  let fixture: ComponentFixture<Midetation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Midetation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Midetation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
