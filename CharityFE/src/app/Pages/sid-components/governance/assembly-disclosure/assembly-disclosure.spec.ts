import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyDisclosure } from './assembly-disclosure';

describe('AssemblyDisclosure', () => {
  let component: AssemblyDisclosure;
  let fixture: ComponentFixture<AssemblyDisclosure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssemblyDisclosure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssemblyDisclosure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
