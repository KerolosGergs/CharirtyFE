import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card1 } from './card1';

describe('Card1', () => {
  let component: Card1;
  let fixture: ComponentFixture<Card1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Card1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
