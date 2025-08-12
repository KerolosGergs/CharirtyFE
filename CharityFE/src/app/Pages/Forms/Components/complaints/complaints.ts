import { Component, inject } from '@angular/core';
import { ComplaintPayload, HelpService } from './service/help-service';
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
import { AuthServ } from '../../../../Auth/Services/auth-serv';


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
  Auth = inject(AuthServ);
  // لم يعد مطلوب userId في الـ payload الجديد

  Title = 'هل لديك شكوى أو ملاحظة؟';
  description = 'نحن نرحب بسماع صوتك ونسعى جاهدين لتحسين خدماتنا...';

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      category: [null, Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^966\d{9}$/)]],
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  submit() {
    if (this.requestForm.invalid) return;

    const { category, userName, email, phoneNumber, title, message } = this.requestForm.value;

    const payload: ComplaintPayload = {
      userName: userName?.trim(),
      email: email?.trim(),
      phoneNumber: phoneNumber?.trim(),
      description: `${title?.trim()}\n\n${message?.trim()}`, // دمج العنوان مع الرسالة
      category: Number(category)
    };

    this.requestService.createComplain(payload).subscribe({
      next: () => {
        this.TostarServ.showSuccess('تم إرسال الشكوى بنجاح');
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