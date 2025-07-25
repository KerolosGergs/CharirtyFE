import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredDocuments } from './required-documents';

describe('RequiredDocuments', () => {
  let component: RequiredDocuments;
  let fixture: ComponentFixture<RequiredDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredDocuments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
