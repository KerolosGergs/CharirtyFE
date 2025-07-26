import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpLayout } from './help-layout';

describe('HelpLayout', () => {
  let component: HelpLayout;
  let fixture: ComponentFixture<HelpLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
