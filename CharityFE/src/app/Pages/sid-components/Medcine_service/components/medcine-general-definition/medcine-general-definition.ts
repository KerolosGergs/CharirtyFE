import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
interface StaffMember {
  name: string;
  specialty: string;
}


@Component({
  selector: 'app-medcine-general-definition',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './medcine-general-definition.html',
  styleUrl: './medcine-general-definition.scss'
})
export class MedcineGeneralDefinition implements OnInit {
  responsibilities: string[] = [
    'الإشراف على جميع شؤون الخدمات الطبية في الجمعية وإداراتها والتنسيق بينها بما يضمن جودة الخدمة الطبية المقدمة',
    'متابعة تنفيذ إستراتيجيات وخطط وبرامج وضوابط ومواصفات الخدمات العلاجية المقدمة لتحقيق حاجات مجتمع مكة المكرمة',
    'إعداد الخطط السنوية التشغيلية والإدارية والموازنات التقديرية لكافة انشطة القطاع (في ظل الخطة الاستراتيجية للجمعية ككل) ومتابعة تنفيذها بعد اعتمادها',
    'مراجعة وتقييم التقارير والإحصاءات المتعلقة بأداء العمل وتحليلها والاستفادة منها في مجال تطوير العمل',
    'العمل على تطوير العاملين بقطاع الخدمات الطبية من خلال البرامج التدريبية وبرامج التدريب المستمر بهدف رفع وتطوير مستوى الأداء',
    'وضع الأسس والمعايير اللازمة لتقويم أداء العمل والعاملين بمجال الخدمات الطبية لتجويد الخدمات المقدمة',
    'التخطيط لتعزيز وتطوير آليات التفاعل مع المستفيدين من الخدمات الطبية من المرضى وذويهم؛ بما يضمن إتاحة الفرصة لهم لإبداء وجهات نظرهم وملاحظاتهم حول الخدمات الطبية المقدمة لهم',
    'ايجاد سبل مبتكرة لتشجيع الافراد والمؤسسات والشركات على دعم مشاريع الخدمات الطبية',
    'تبادل المعلومات والخبرات وتدعيم العلاقات مع الجهات الطبية ذات الأهداف والأنشطة المماثلة داخل المملكة وخارجها',
    'القيام بأية مهام أخرى يكلف بها في مجال تخصصه'
  ];

  staffMembers: StaffMember[] = [
    { name: 'د. اشرف السنوسي احمد ابو العز', specialty: 'استشاري تخاطب' },
    { name: 'د. هشام بدر الدين ابراهيم المشد', specialty: 'استشاري أنف وأذن وحنجرة' },
    { name: 'د. منال محمد نجيب علي', specialty: 'استشاري تخاطب' },
    { name: 'د. هشام عبدالظاهر ثابت عبدالعال', specialty: 'اخصائي امراض الكلى' },
    { name: 'د.مجدي سيد ابراهيم محمد', specialty: 'طبيب عام' },
    { name: 'مجدي ابراهيم البيومي محمد', specialty: 'تخاطب' },
    { name: 'غادة محمد جاد إبراهيم', specialty: 'اخصائي تمريض' },
    { name: 'محمود محمد حسين خضر', specialty: 'تخاطب' },
    { name: 'د.لطف الله عبدالقدوس شهاب الدين', specialty: 'طبيب عام' },
    { name: 'اسلام عبد الفتاح احمد ابو زيد', specialty: 'اخصائي تمريض' },
    { name: 'فاطمة العضايلة', specialty: 'اخصائي تخاطب وسمعيات' },
    { name: 'نبيهة عبد القادر الكواش', specialty: 'فني تمريض' },
    { name: 'شيخ حميدة بيقم ذوالفقار علي', specialty: 'فني تمريض' },
    { name: 'محمد عثمان محمد ابراهيم', specialty: 'فني أجهزة سمعية' },
    { name: 'أيتي ريسمايانتي بنت جوهري كيم', specialty: 'فني تمريض' },
    { name: 'ماريجيم تايونا ناسيلين', specialty: 'فني تمريض' },
    { name: 'مها محمد سيد احمد', specialty: 'فني تمريض' },
    { name: 'ميرلاليا اونكا بيرمتس', specialty: 'اخصائي تمريض' },
    { name: 'راضية محمد يوسف', specialty: 'فني تمريض' },
    { name: 'خالدة حسين محمد', specialty: 'فني تمريض' },
    { name: 'شبنم محم', specialty: 'فني تمريض' },
    { name: 'دعاء عزب بخيت', specialty: 'فني تمريض' },
    { name: 'منال حسن سالم عزيزي', specialty: 'اخصائي تمريض' },
    { name: 'مريم وي هاماء توناهون', specialty: 'اخصائي تمريض' },
    { name: 'يوليانتي ليلي سيرلي توحه', specialty: 'فني تمريض' },
    { name: 'نينيج ايدي واتي بت حنبلي سنامي', specialty: 'فني تمريض' },
    { name: 'سلطانة علي الرهيد ديران', specialty: 'فني تمريض' },
    { name: 'بندر محمد عيضة الحارثي', specialty: 'فني صيدلة' },
    { name: 'ريمه صلاح الدين محمد', specialty: 'فني تمريض' },
    { name: 'حياة صلاح الدين عوض محمد', specialty: 'فني تمريض' },
    { name: 'هيام ابو البشر عبدالمجيد', specialty: 'فني تمريض' },
    { name: 'سارة محمد شكري الملايو', specialty: 'فني تمريض' }
  ];
  specialties: string[] = [];
  doctorCount = 0;

  groupedStaff: { [key: string]: StaffMember[] } = {};
  filteredGroupedStaff: { [key: string]: StaffMember[] } = {};
  searchText = '';
  activeTab = 'all';

  ngOnInit(): void {
    this.groupStaffBySpecialty();

    this.doctorCount = this.staffMembers.filter(s =>
      s.specialty.includes('استشاري') ||
      s.specialty.includes('طبيب') ||
      s.name.includes('د.')
    ).length;

    this.specialties = Object.keys(this.groupedStaff);
        this.filteredGroupedStaff = { ...this.groupedStaff };


  }

  private groupStaffBySpecialty(): void {
    this.groupedStaff = this.staffMembers.reduce((groups, staff) => {
      const specialty = staff.specialty;
      if (!groups[specialty]) {
        groups[specialty] = [];
      }
      groups[specialty].push(staff);
      return groups;
    }, {} as { [key: string]: StaffMember[] });
  }
    filterStaff(): void {
    const query = this.searchText.trim().toLowerCase();
    if (!query) {
      this.filteredGroupedStaff = { ...this.groupedStaff };
      return;
    }
    this.filteredGroupedStaff = {};
    for (const specialty of this.specialties) {
      const filtered = this.groupedStaff[specialty].filter(staff =>
        staff.name.toLowerCase().includes(query)
      );
      if (filtered.length > 0) {
        this.filteredGroupedStaff[specialty] = filtered;
      }
    }
  }

  getSpecialtyIcon(specialty: string): string {
    if (specialty.includes('استشاري') || specialty.includes('طبيب')) {
      return 'bi bi-person-badge';
    } else if (specialty.includes('تمريض')) {
      return 'bi bi-heart-pulse';
    } else if (specialty.includes('تخاطب')) {
      return 'bi bi-chat-dots';
    } else if (specialty.includes('صيدلة')) {
      return 'bi bi-capsule';
    } else if (specialty.includes('أجهزة سمعية')) {
      return 'bi bi-ear';
    }
    return 'bi bi-person';
  }
} // End of Component
