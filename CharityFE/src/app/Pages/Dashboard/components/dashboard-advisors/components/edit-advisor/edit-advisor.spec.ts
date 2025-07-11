import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvisor } from './edit-advisor';

describe('EditAdvisor', () => {
  let component: EditAdvisor;
  let fixture: ComponentFixture<EditAdvisor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdvisor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdvisor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
