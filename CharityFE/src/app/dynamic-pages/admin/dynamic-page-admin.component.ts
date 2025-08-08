import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { 
  DynamicPagesService, 
  DynamicPage, 
  ContentItem, 
  CreateDynamicPageDto, 
  UpdateDynamicPageDto,
  CreateContentItemDto,
  UpdateContentItemDto,
  ApiResponse 
} from '../dynamic-pages.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dynamic-page-admin',
  templateUrl: './dynamic-page-admin.component.html',
  styleUrls: ['./dynamic-page-admin.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class DynamicPageAdminComponent implements OnInit {
  pageForm: FormGroup;
  pages: DynamicPage[] = [];
  successMsg = '';
  errorMsg = '';
  isLoading = false;
  isEditing = false;
  editingPageId: number | null = null;
  selectedFiles: { [key: string]: File } = {};
  selectedPage: DynamicPage | null = null;

  constructor(
    private fb: FormBuilder, 
    private dynamicPagesService: DynamicPagesService
  ) {
    this.pageForm = this.fb.group({
      pageName: ['', Validators.required],
      description: [''],
      items: this.fb.array([])
    });
  }

  ngOnInit() {
    this.loadPages();
    this.addTextItem(); // Add initial text item
  }

  get itemsArray(): FormArray {
    return this.pageForm.get('items') as FormArray;
  }

  loadPages() {
    this.isLoading = true;
    this.dynamicPagesService.getPages().subscribe({
      next: (response: ApiResponse<DynamicPage[]>) => {
        if (response.success) {
          this.pages = response.data;
        } else {
          this.errorMsg = response.message || 'حدث خطأ أثناء تحميل الصفحات';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMsg = 'حدث خطأ أثناء تحميل الصفحات';
        this.isLoading = false;
        console.error('Error loading pages:', error);
      }
    });
  }

  addTextItem() {
    const textItem = this.fb.group({
      type: ['text'],
      content: ['', Validators.required],
      order: [0]
    });
    this.itemsArray.push(textItem);
  }

  addImageTextItem() {
    const imageTextItem = this.fb.group({
      type: ['image_text'],
      content: ['', Validators.required],
      imageUrl: [''],
      order: [0]
    });
    this.itemsArray.push(imageTextItem);
  }

  addFileItem() {
    const fileItem = this.fb.group({
      type: ['file'],
      content: ['', Validators.required],
      fileUrl: [''],
      fileName: [''],
      order: [0]
    });
    this.itemsArray.push(fileItem);
  }

  addVideoItem() {
    const videoItem = this.fb.group({
      type: ['video'],
      content: ['', Validators.required],
      videoUrl: ['', Validators.required],
      order: [0]
    });
    this.itemsArray.push(videoItem);
  }

  removeItem(index: number) {
    this.itemsArray.removeAt(index);
  }

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[index] = file;
      const item = this.itemsArray.at(index);
      if (item.get('type')?.value === 'image_text') {
        item.patchValue({ imageUrl: file.name });
      } else if (item.get('type')?.value === 'file') {
        item.patchValue({ fileName: file.name });
      }
    }
  }

  async submit() {
    if (this.pageForm.valid) {
      this.isLoading = true;
      this.errorMsg = '';
      this.successMsg = '';

      try {
        const formData = this.pageForm.value;
        const items: CreateContentItemDto[] = [];

        // Process each item and upload files if needed
        for (let i = 0; i < this.itemsArray.length; i++) {
          const item = this.itemsArray.at(i).value;
          const selectedFile = this.selectedFiles[i];

          if (selectedFile) {
            // Upload file using firstValueFrom
            try {
              const uploadResponse = await firstValueFrom(this.dynamicPagesService.uploadFile(selectedFile));
              if (uploadResponse.success) {
                if (item.type === 'image_text') {
                  item.imageUrl = uploadResponse.data.url;
                } else if (item.type === 'file') {
                  item.fileUrl = uploadResponse.data.url;
                  item.fileName = uploadResponse.data.fileName;
                }
              } else {
                this.errorMsg = uploadResponse.message || 'حدث خطأ أثناء رفع الملف';
                this.isLoading = false;
                return;
              }
            } catch (uploadError) {
              this.errorMsg = 'حدث خطأ أثناء رفع الملف';
              this.isLoading = false;
              console.error('Upload error:', uploadError);
              return;
            }
          }

          items.push({
            type: item.type,
            content: item.content,
            imageUrl: item.imageUrl,
            fileUrl: item.fileUrl,
            fileName: item.fileName,
            videoUrl: item.videoUrl,
            order: i
          });
        }

        if (this.isEditing && this.editingPageId) {
          // Update existing page
          const updateData: UpdateDynamicPageDto = {
            pageName: formData.pageName,
            description: formData.description,
            items: items.map(item => ({
              ...item,
              id: undefined, // Will be handled by backend for new items
              dynamicPageId: this.editingPageId!
            }))
          };

          this.dynamicPagesService.updatePage(this.editingPageId, updateData).subscribe({
            next: (response: ApiResponse<DynamicPage>) => {
              if (response.success) {
                this.successMsg = 'تم تحديث الصفحة بنجاح';
                this.resetForm();
                this.loadPages();
              } else {
                this.errorMsg = response.message || 'حدث خطأ أثناء التحديث';
              }
              this.isLoading = false;
            },
            error: (error) => {
              this.errorMsg = 'حدث خطأ أثناء التحديث';
              this.isLoading = false;
              console.error('Update error:', error);
            }
          });
        } else {
          // Create new page
          const createData: CreateDynamicPageDto = {
            pageName: formData.pageName,
            description: formData.description,
            items: items
          };

          this.dynamicPagesService.createPage(createData).subscribe({
            next: (response: ApiResponse<DynamicPage>) => {
              if (response.success) {
                this.successMsg = 'تم إنشاء الصفحة بنجاح';
                this.resetForm();
                this.loadPages();
              } else {
                this.errorMsg = response.message || 'حدث خطأ أثناء الإنشاء';
              }
              this.isLoading = false;
            },
            error: (error) => {
              this.errorMsg = 'حدث خطأ أثناء الإنشاء';
              this.isLoading = false;
              console.error('Create error:', error);
            }
          });
        }
      } catch (error) {
        this.errorMsg = 'حدث خطأ أثناء معالجة البيانات';
        this.isLoading = false;
        console.error('Submit error:', error);
      }
    }
  }

  editPage(page: DynamicPage) {
    this.isEditing = true;
    this.editingPageId = page.id || null;
    this.pageForm.patchValue({
      pageName: page.pageName,
      description: page.description
    });

    // Clear existing items
    while (this.itemsArray.length) {
      this.itemsArray.removeAt(0);
    }

    // Add items from the page
    if (page.items && page.items.length > 0) {
      page.items.forEach(item => {
        const itemGroup = this.fb.group({
          type: [item.type],
          content: [item.content, Validators.required],
          imageUrl: [item.imageUrl || ''],
          fileUrl: [item.fileUrl || ''],
          fileName: [item.fileName || ''],
          videoUrl: [item.videoUrl || ''],
          order: [item.order]
        });
        this.itemsArray.push(itemGroup);
      });
    } else {
      // Add initial text item if no items exist
      this.addTextItem();
    }
  }

  deletePage(id: number) {
    if (confirm('هل أنت متأكد من حذف هذه الصفحة؟')) {
      this.isLoading = true;
      this.dynamicPagesService.deletePage(id).subscribe({
        next: (response: ApiResponse<void>) => {
          if (response.success) {
            this.successMsg = 'تم حذف الصفحة بنجاح';
            this.loadPages();
          } else {
            this.errorMsg = response.message || 'حدث خطأ أثناء الحذف';
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMsg = 'حدث خطأ أثناء الحذف';
          this.isLoading = false;
          console.error('Delete error:', error);
        }
      });
    }
  }

  toggleActive(id: number) {
    this.dynamicPagesService.toggleActive(id).subscribe({
      next: (response: ApiResponse<DynamicPage>) => {
        if (response.success) {
          this.successMsg = response.message || 'تم تحديث حالة الصفحة بنجاح';
          this.loadPages(); // Reload pages to get updated data
        } else {
          this.errorMsg = response.message || 'حدث خطأ أثناء تحديث حالة الصفحة';
        }
      },
      error: (error) => {
        this.errorMsg = 'حدث خطأ أثناء تحديث حالة الصفحة';
        console.error('Error toggling page active status:', error);
      }
    });
  }

  viewItems(page: DynamicPage) {
    this.selectedPage = page;
    // Show the modal using Bootstrap
    const modal = document.getElementById('itemsModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  resetForm() {
    this.pageForm.reset();
    this.isEditing = false;
    this.editingPageId = null;
    this.selectedFiles = {};
    
    // Clear items array
    while (this.itemsArray.length) {
      this.itemsArray.removeAt(0);
    }
    
    // Add initial text item
    this.addTextItem();
  }

  getItemTypeLabel(type: string): string {
    switch (type) {
      case 'text': return 'نص';
      case 'image_text': return 'صورة مع نص';
      case 'file': return 'ملف';
      case 'video': return 'فيديو';
      default: return type;
    }
  }

  hasContent(): boolean {
    return this.itemsArray.length > 0 && this.itemsArray.at(0).get('content')?.value;
  }

  validateFileSize(file: File, maxSizeMB: number = 5): boolean {
    return file.size <= maxSizeMB * 1024 * 1024;
  }

  validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  }
}
