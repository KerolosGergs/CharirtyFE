import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Satisfaction } from './satisfaction';

describe('Satisfaction', () => {
  let component: Satisfaction;
  let fixture: ComponentFixture<Satisfaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Satisfaction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Satisfaction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
