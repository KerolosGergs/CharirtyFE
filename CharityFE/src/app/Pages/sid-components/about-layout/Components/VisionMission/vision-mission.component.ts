import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ValueItem {
  icon: string;
  text: string;
}
interface GoalItem {
  icon: string;
  title: string;
  details?: string;
}

@Component({
  selector: 'app-vision-mission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vision-mission.component.html',
  styleUrl: './vision-mission.component.scss'
})
export class VisionMissionComponent {
  message = `تحرص الجمعية الخيرية بمكة المكرمة على أن تقدم الخدمات الإنسانية والمساعدات الماليــة والعينيــة والصحيــة والتعليمية والاجتماعية للمحتاجين إليها من أفــراد مجتمع مكة المكرمة بما يحفظ كرامتهم ، مع العمل على تأهيلهم وتطوير قدراتهم ليكونــوا قـــوة فاعلــة ومستدامــة في المجتمــع وبما يكسب الجمعية ثقة الداعمين`;
  vision = `أن تكون الجمعية رائدة للأعمــال الإنسانيــــة والخيريــــــــة المتميزة في المملكة العربية السعودية وأن تضع المستفيد على طريق الاكتفاء الذاتي مدعومة بموارد متجددة وخدمات عصرية وفق أحدث الممارسات العالمية وبما يتماشى مع رؤية المملكة 2030`;

  values: ValueItem[] = [
    { icon: 'bi-heart', text: 'استشعار شرف وقدسية مكة المكرمة وفضل العمل الخيري بها' },
    { icon: 'bi-lock', text: 'المحافظة على الأسرار بما يحفظ كرامة المستفيد' },
    { icon: 'bi-people', text: 'إسعاد الأسر والفئات الأكثر حاجة في المجتمع' },
    { icon: 'bi-bullseye', text: 'التميز والفاعلية في أداء المهام' },
    { icon: 'bi-shield-check', text: 'الشفافية والنزاهة، والعدالة والالتزام بقواعد الشريعة الإسلامية وقوانين الدولة المنظمة للعمل الخيري وإدارة مصادر التمويل' },
    { icon: 'bi-diagram-3', text: 'العمل على مشاركة الجهات والقطاعات الحكومية والأهلية، في تقديم الخدمة المميّزة لمجتمع مكة المكرمة' },
  ];

  goals: GoalItem[] = [
    { icon: 'bi-graph-up-arrow', title: 'تطوير برامج المساعدات الخيرية' },
    { icon: 'bi-cash-coin', title: 'تنمية الموارد المالية للجمعية' },
    { icon: 'bi-building', title: 'بناء القدرة المؤسسية للجمعية' },
    { icon: 'bi-gear', title: 'التوسع في تسخير التقنية لضبط وتسهيل وتقنين خدمات الجمعية' },
    { icon: 'bi-hospital', title: 'التوسع في خدمات القطاع الطبي' },
  ];

  openGoalIndex: number | null = null;

  toggleGoal(index: number) {
    this.openGoalIndex = this.openGoalIndex === index ? null : index;
  }
} 