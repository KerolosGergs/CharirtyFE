import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponentConsultant } from './header-component-consultant';

describe('HeaderComponentConsultant', () => {
  let component: HeaderComponentConsultant;
  let fixture: ComponentFixture<HeaderComponentConsultant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponentConsultant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponentConsultant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
