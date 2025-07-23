import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAssembly } from './general-assembly';

describe('GeneralAssembly', () => {
  let component: GeneralAssembly;
  let fixture: ComponentFixture<GeneralAssembly>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralAssembly]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAssembly);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
