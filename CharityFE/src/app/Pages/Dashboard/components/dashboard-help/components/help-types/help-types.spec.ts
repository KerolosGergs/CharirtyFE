import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpTypesComponent } from './help-types';

describe('HelpTypes', () => {
  let component: HelpTypesComponent;
  let fixture: ComponentFixture<HelpTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
