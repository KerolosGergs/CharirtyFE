import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPeopole } from './help-peopole';

describe('HelpPeopole', () => {
  let component: HelpPeopole;
  let fixture: ComponentFixture<HelpPeopole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpPeopole]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpPeopole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
