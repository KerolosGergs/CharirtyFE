import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about-summary',
  standalone: true,
  templateUrl: './about-summary.component.html',
  styleUrl: './about-summary.component.scss'
})
export class AboutSummaryComponent {
  summaryText: string = `من منطلق التفاني في طاعة الله ورسوله الكريم ظهرت فكرة إنشاء الجمعية الخيرية بمكة المكرمة وهي الصرح الخيري الذي تأسس في عام 1398هـ ،ومسجلة بوزارة بوزارة الموارد البشرية والتنمية الاجتماعية بالرقم (29) حيث تقدم خدماتها الصحية والعينية لفقراء الحرم وحدود خدماتها (50) كيلو من مركز مكة المكرمة حيث أن أنشطتها وخدماتها تقدم فقط في مكة المكرمة قال الله تعالى: (يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِمَّا رَزَقْنَاكُم من قَبْلِ أَن يَأْتِيَ يَوْمٌ لا بَيْعٌ فِيهِ وَلا خُلَّةٌ وَلا شَفَاعَةٌ وَالْكَافِرُونَ هُمُ الظَّالِمُونَ( حديث أَبي هريرة - رضي االله عنه - ( السَّاعِي علَى الأَرْمَلَةِ وَالمِسْكِينِ كَالمُجاهِدِ في سبيلِ الله ). متفق عليه وفي الحديث المذكور أخرجه الطبراني في الكبير وابن أبي الدنيا في قضاء الحوائج عن ابن عمر رضي الله عنهما ، أن النبي صلى الله عليه وسلم قال: (أحب الناس إلى الله أنفعهم، وأحب الأعمال إلى الله عز وجل سرور تدخله على مسلم، أو تكشف عنه كربة، أو تقضي عنه دينا،ً أو تطرد عنه جوعا.ً.. ) والحديث حسنه الألباني رحمة الله .`;
  videoUrl: SafeResourceUrl;
  showVideo = false;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/6ToC-N9-dVo');
  }
} 