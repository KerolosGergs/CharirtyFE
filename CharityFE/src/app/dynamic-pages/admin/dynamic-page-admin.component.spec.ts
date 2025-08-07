import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DynamicPageAdminComponent } from './dynamic-page-admin.component';
import { DynamicPagesService } from '../dynamic-pages.service';

describe('DynamicPageAdminComponent', () => {
  let component: DynamicPageAdminComponent;
  let fixture: ComponentFixture<DynamicPageAdminComponent>;
  let service: DynamicPagesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DynamicPageAdminComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [DynamicPagesService]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicPageAdminComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DynamicPagesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.pageForm.get('pageName')?.value).toBe('');
    expect(component.itemsArray.length).toBe(1); // Initial text item
  });

  it('should add text item', () => {
    const initialLength = component.itemsArray.length;
    component.addTextItem();
    expect(component.itemsArray.length).toBe(initialLength + 1);
  });

  it('should add image text item', () => {
    const initialLength = component.itemsArray.length;
    component.addImageTextItem();
    expect(component.itemsArray.length).toBe(initialLength + 1);
  });

  it('should add file item', () => {
    const initialLength = component.itemsArray.length;
    component.addFileItem();
    expect(component.itemsArray.length).toBe(initialLength + 1);
  });

  it('should remove item', () => {
    component.addTextItem();
    const initialLength = component.itemsArray.length;
    component.removeItem(1);
    expect(component.itemsArray.length).toBe(initialLength - 1);
  });

  it('should validate required fields', () => {
    const form = component.pageForm;
    expect(form.valid).toBeFalsy();
    
    form.patchValue({ pageName: 'Test Page' });
    expect(form.get('pageName')?.valid).toBeTruthy();
  });

  it('should get correct item type label', () => {
    expect(component.getItemTypeLabel('text')).toBe('نص');
    expect(component.getItemTypeLabel('image_text')).toBe('صورة مع نص');
    expect(component.getItemTypeLabel('file')).toBe('ملف');
  });

  it('should validate file size', () => {
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    Object.defineProperty(mockFile, 'size', { value: 1024 * 1024 }); // 1MB
    
    expect(component.validateFileSize(mockFile, 5)).toBeTruthy();
    expect(component.validateFileSize(mockFile, 0.5)).toBeFalsy();
  });

  it('should validate file type', () => {
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    
    expect(component.validateFileType(mockFile, ['jpg', 'png'])).toBeTruthy();
    expect(component.validateFileType(mockFile, ['pdf', 'doc'])).toBeFalsy();
  });
}); 