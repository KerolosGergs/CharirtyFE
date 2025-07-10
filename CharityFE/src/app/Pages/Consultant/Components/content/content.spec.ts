import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConsultant } from './content';

describe('Content', () => {
  let component: ContentConsultant;
  let fixture: ComponentFixture<ContentConsultant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentConsultant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentConsultant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
