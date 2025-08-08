import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePageService } from '../../../../../../Core/Services/HomePage/home-page-service';
import { GeneralResponse, IHeroSection, putHeroSection } from '../../../../../../Core/Interfaces/HomePage/ihome-page';

@Component({
  selector: 'app-dashboard-hero-section',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-hero-section.html',
  styleUrl: './dashboard-hero-section.scss'
})
export class DashboardHeroSection {
  heroData = signal<IHeroSection>({
    mainTitle: '',
    backgroundImageUrl: '',
    stats1Label: '',
    stats1Value: 0,
    stats2Label: '',
    stats2Value: 0,
    stats3Label: '',
    stats3Value: 0,
    stats4Label: '',
    stats4Value: 0
  });

  backgroundFile = signal<File | null>(null);
  loading = signal(false);
  updating = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  heroForm: FormGroup;

  constructor(
    private homePageService: HomePageService,
    private fb: FormBuilder
  ) {
    this.heroForm = this.fb.group({
      mainTitle: ['', Validators.required],
      backgroundImageUrl: [''],
      stats1Label: ['', Validators.required],
      stats1Value: [0, [Validators.required, Validators.min(0)]],
      stats2Label: ['', Validators.required],
      stats2Value: [0, [Validators.required, Validators.min(0)]],
      stats3Label: ['', Validators.required],
      stats3Value: [0, [Validators.required, Validators.min(0)]],
      stats4Label: ['', Validators.required],
      stats4Value: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadHeroData();
  }

  loadHeroData() {
    this.loading.set(true);
    this.homePageService.getHeroSection().subscribe({
      next: (response: GeneralResponse<IHeroSection>) => {
        if (response?.success && response.data) {
          const data = response.data;
          this.heroData.set({
            mainTitle: data.mainTitle || '',
            backgroundImageUrl: data.backgroundImageUrl || '',
            stats1Label: data.stats1Label || '',
            stats1Value: data.stats1Value || 0,
            stats2Label: data.stats2Label || '',
            stats2Value: data.stats2Value || 0,
            stats3Label: data.stats3Label || '',
            stats3Value: data.stats3Value || 0,
            stats4Label: data.stats4Label || '',
            stats4Value: data.stats4Value || 0
          });
          this.heroForm.patchValue(this.heroData());
        } else {
          this.errorMessage.set('لا توجد بيانات لقسم البطل');
        }
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('حدث خطأ أثناء تحميل بيانات قسم البطل');
        this.loading.set(false);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.backgroundFile.set(input.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.heroData.update((data) => ({
          ...data,
          backgroundImageUrl: e.target?.result as string
        }));
        this.heroForm.patchValue({ backgroundImageUrl: this.heroData().backgroundImageUrl });
      };
      reader.readAsDataURL(this.backgroundFile()!);
    }
  }

 async updateHeroSection() {
  if (this.heroForm.invalid || (!this.heroForm.value.backgroundImageUrl && !this.backgroundFile())) {
    this.heroForm.markAllAsTouched();
    return;
  }

  this.updating.set(true);
  this.successMessage.set('');
  this.errorMessage.set('');

  try {
    const formValues = this.heroForm.value;

    let backgroundImageUrl = formValues.backgroundImageUrl;
    if (this.backgroundFile()) {
      backgroundImageUrl = await this.uploadFile(this.backgroundFile()!);
    }

    const payload = new FormData();
    payload.append('MainTitle', formValues.mainTitle);
    payload.append('BackgroundImageUrl', this.backgroundFile()!); // Use uploaded or existing
    payload.append('Stats1Label', formValues.stats1Label);
    payload.append('Stats1Value', formValues.stats1Value.toString());
    payload.append('Stats2Label', formValues.stats2Label);
    payload.append('Stats2Value', formValues.stats2Value.toString());
    payload.append('Stats3Label', formValues.stats3Label);
    payload.append('Stats3Value', formValues.stats3Value.toString());
    payload.append('Stats4Label', formValues.stats4Label);
    payload.append('Stats4Value', formValues.stats4Value.toString());

    this.homePageService.putHeroSection(payload).subscribe({
      next: (response: GeneralResponse<IHeroSection>) => {
        if (response.success) {
          this.successMessage.set('تم تحديث قسم البطل بنجاح');
          this.loadHeroData();
          this.backgroundFile.set(null);
          setTimeout(() => this.successMessage.set(''), 3000);
        } else {
          this.errorMessage.set(response.message || 'حدث خطأ أثناء الحفظ');
        }
        this.updating.set(false);
      },
      error: () => {
        this.errorMessage.set('حدث خطأ أثناء تحديث قسم البطل');
        this.updating.set(false);
      }
    });
  } catch (error) {
    this.errorMessage.set('حدث خطأ أثناء رفع الصورة');
    this.updating.set(false);
  }
}


  private async uploadFile(file: File): Promise<string> {
    // Placeholder for file upload logic
    // Replace with actual API call to upload the file and return a URL
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file));
      }, 1000);
    });
  }
}