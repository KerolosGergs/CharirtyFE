import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MustLogin } from './must-login';

describe('MustLogin', () => {
  let component: MustLogin;
  let fixture: ComponentFixture<MustLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MustLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MustLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
