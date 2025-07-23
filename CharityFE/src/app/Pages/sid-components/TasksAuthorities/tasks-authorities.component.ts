import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TaskItem {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-tasks-authorities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-authorities.component.html',
  styleUrl: './tasks-authorities.component.scss'
})
export class TasksAuthoritiesComponent {
  tasks: TaskItem[] = [
    { icon: 'bi-people', text: 'تقديم الخدمات الاجتماعية المعنوية والعينية والنقدية للأسر المحتاجة وفق الضوابط التي يضعها مجلس الإدارة .' },
    { icon: 'bi-hospital', text: 'المساهمة في تغطية تكاليف الخدمات والصحية والتعليمية والإسكانية لمن هم بحاجة اليها وفق الضوابط التي يضعها مجلس الإدارة.' },
    { icon: 'bi-graph-up-arrow', text: 'المساهمة في تصميم وتنفيذ البرامج التي تأخذ بيد المحتاج حتى يستكفي ، ودعم التنمية الاجتماعية .' },
    { icon: 'bi-cash-coin', text: 'العمل على زيادة دخل الجمعية لتغطية مزيد من الاحتياج.' },
    { icon: 'bi-person-heart', text: 'إتاحة الفرصة للعمل التطوعي في مجالات الجمعية .' },
    { icon: 'bi-house-door', text: 'إنشاء الدور الاجتماعية والمراكز الإيوائية .' },
    { icon: 'bi-emoji-smile', text: 'إنشاء دار أو أكثر حول المسجد الحرام لرعاية الأطفال واستقبالهم ليتمكن ذووهم من أداء المناسك ، وللمحافظة على الهدوء داخل المسجد الحرام.' },
  ];
} 