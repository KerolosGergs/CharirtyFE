import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdvisor } from './new-advisor';

describe('NewAdvisor', () => {
  let component: NewAdvisor;
  let fixture: ComponentFixture<NewAdvisor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAdvisor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAdvisor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
