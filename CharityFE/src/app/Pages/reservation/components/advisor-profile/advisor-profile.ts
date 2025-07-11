import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Advisor } from '../../../../Core/Services/advisor';
import { advisor } from '../../../../Core/Interfaces/advisor';

@Component({
  selector: 'app-advisor-profile',
  imports: [],
  templateUrl: './advisor-profile.html',
  styleUrl: './advisor-profile.scss'
})
export class AdvisorProfile implements OnInit {
   isLoading: boolean = true;
  error: string | null = null;
   constructor(
    private route: ActivatedRoute,
    private advisorService: Advisor
  ) {}
  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
      const advisorId = params['id'];
      if (advisorId) {
        this.loadAdvisorData(parseInt(advisorId));
      } else {
        this.error = 'لم يتم تحديد المستشار';
        this.isLoading = false;
      }
    });
  }

  
    advisorData: advisor = {
      id: 0,
      fullName: '',
      description: '',
      specialty: '',
      email: '',
      phoneNumber: '',
      isAvailable: false,
      consultationName: '',
      totalConsultations: 0,
      pendingRequests: 0,
      averageRating: 0,
      zoomRoomUrl: '',
      consultationId: 0,
      userId: '',
      userName: '',
      firstName: '',
      lastName: '',
      isActive: false,
      createdAt: '',
      updatedAt: ''
    };
     image:string= 'Images/advisor.jpg';
//   advisorData: Advisor = {

//     name: 'د. فهد العتيبي',
//     title: 'استشاري اجتماعي وتنموي',
//     description: `يمتلك أكثر من 18 عامًا من الخبرة في مجال العمل الاجتماعي والتنموي،
//       عمل خلالها مع عدد من الجهات الحكومية والمنظمات غير الربحية في تطوير الخطط الاستراتيجية
//       وبناء نماذج التدخل الاجتماعي وتقييم الأثر المجتمعي.`,
//     featuresTitle: 'الميزات',
//     features: [
//   { icon: 'bi-briefcase', label: 'سنوات الخبرة', value: '18 عامًا' },
//   { icon: 'bi-translate', label: 'اللغات', value: 'عربي، إنجليزي' },
//   { icon: 'bi-chat-dots', label: 'أنواع التواصل', value: 'مكالمة، مكالمة فيديو' },
//   { icon: 'bi-award', label: 'الشهادات', value: 'دكتوراه في السياسات الاجتماعية, ماجستير في التخطيط التنموي, بكالوريوس في علم الاجتماع', isList: true }
// ]

//   };


   loadAdvisorData(advisorId: number): void {
    this.isLoading = true;
    this.error = null;

    this.advisorService.getAdvisorById(advisorId).subscribe({
      next: (response) => {
        if (response && response.success) {
          this.advisorData = response.data;
          // جلب المواعيد المتاحة بعد تحميل بيانات المستشار 
        } else {
          this.error = 'فشل في تحميل بيانات المستشار';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading advisor data:', err);
        this.error = 'حدث خطأ في تحميل بيانات المستشار';
        this.isLoading = false;
      }
    });
  }
}
