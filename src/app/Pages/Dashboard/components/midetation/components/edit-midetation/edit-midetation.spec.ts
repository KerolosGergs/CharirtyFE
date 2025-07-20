import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMidetation } from './edit-midetation';

describe('EditMidetation', () => {
  let component: EditMidetation;
  let fixture: ComponentFixture<EditMidetation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMidetation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMidetation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
