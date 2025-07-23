import { Component, inject } from '@angular/core';
import { HelpService } from './service/help-service';
import { TostarServ } from '../../../../Shared/tostar-serv';
import { Router } from '@angular/router';
import { Footer } from "../../../../Shared/footer/footer";
import { HeaderComponentConsultant } from "../../../Consultant/Components/header-component-consultant/header-component-consultant";
import { Nav } from "../../../Home/Components/nav/nav";
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactInfo, SocialMediaLink } from '../help-peopole/model/ihelp';
import { CategoryOptions, RequestModel } from './model/ihelp';
import { ContactInfoComponent } from "../contact-info/contact-info";
import { Spinner } from "../../../../Shared/spinner/spinner";

@Component({
  selector: 'app-complaints',
  imports: [Footer, HeaderComponentConsultant, Nav, HeaderComponent, ReactiveFormsModule, FormsModule, CommonModule, ContactInfoComponent, Spinner],
  templateUrl: './complaints.html',
  styleUrl: './complaints.scss'
})
export class Complaints {
  private fb = inject(FormBuilder);
  private requestService = inject(HelpService);
  TostarServ = inject(TostarServ);
  Router = inject(Router);
  requestForm!: FormGroup;
  categories = CategoryOptions;

  userId = 'b09744b6-410d-449d-b89b-8dda1cbee185'; // fetched or injected

  Title = 'هل لديك شكوى أو ملاحظة؟';
  description = 'نحن نرحب بسماع صوتك ونسعى جاهدين لتحسين خدماتنا. إذا كانت لديك شكوى أو تجربة غير مرضية، نرجو منك تزويدنا بالتفاصيل عبر النموذج أدناه، وسيقوم فريقنا المختص بالتواصل معك في أقرب وقت ممكن.';

  selectedTabId: number | null = null;




  formSection = {
    title: 'أكتب شكواك'
  };



  ngOnInit(): void {
    this.requestForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: [null, Validators.required],
      priority: ['', Validators.required],
    });
  }
  submit() {
    if (this.requestForm.invalid) return;

    const request: RequestModel = {
      ...this.requestForm.value,
      category: Number(this.requestForm.value.category),
      userId: this.userId,
    };

    this.requestService.createRequest(request).subscribe({
      next: () => {
        this.TostarServ.showSuccess('تم إرسال الطلب بنجاح');
        this.requestForm.reset();
      },
      error: () => {
        this.TostarServ.showError('حدث خطأ أثناء الإرسال');
      }
    });
  }






  onSocialMediaClick(link: SocialMediaLink): void {
    window.open(link.url, '_blank');
  }

}