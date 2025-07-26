import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedcineGeneralDefinition } from './medcine-general-definition';

describe('MedcineGeneralDefinition', () => {
  let component: MedcineGeneralDefinition;
  let fixture: ComponentFixture<MedcineGeneralDefinition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedcineGeneralDefinition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedcineGeneralDefinition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
