import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Achive } from './achive';

describe('Achive', () => {
  let component: Achive;
  let fixture: ComponentFixture<Achive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Achive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Achive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
