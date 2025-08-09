import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavItemCreatedDto, NavItemDto, NavItems, PageDto, Pages } from '../../../../../../Core/Interfaces/NavItem/nav-item';
import { NavItemService } from '../../../../../../Core/Services/NavItem/nav-item';

@Component({
  selector: 'app-dashboard-nav-items',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './dashboard-nav-items.html',
  styleUrl: './dashboard-nav-items.scss'
})
export class DashboardNavItems {
private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private navService = inject(NavItemService);

  // ======= State =======
  loading = signal(false);
  navItems = signal<NavItemDto[]>([]);
  selectedNav = signal<NavItemDto | null>(null);

  // صفحات العنصر المحدد (مع دعم id اختياري)
  pages = signal<PageDto[]>([]);

  // ======= Forms =======
  // UPDATED: Reactive Forms + Validators + رسائل عربية
  navForm = this.fb.group({
    label: ['', [Validators.required, Validators.maxLength(100)]],
    href: ['', [Validators.required, Validators.maxLength(200)]],
  });

  pageForm = this.fb.group({
    subTilte: ['', [Validators.required, Validators.maxLength(100)]],
    subLink: ['', [Validators.required, Validators.maxLength(200)]],
  });

  // وضعية تعديل العناصر/الصفحات
  editingNavIndex = signal<number | null>(null);
  editingPageIndex = signal<number | null>(null);

  // ======= Lifecycle =======
  constructor() {
    this.loadNavItems();
  }

  // ======= Loaders =======
  loadNavItems() {
    this.loading.set(true);
    this.navService.getAllNavItemsData().subscribe({
      next: items => {
        this.navItems.set(items ?? []);
        this.loading.set(false);
      },
      error: _ => {
        this.loading.set(false);
        // this.toastr.error('تعذّر تحميل العناصر.', 'خطأ');
      }
    });
  }

  loadPagesFor(nav: NavItemDto) {
    this.selectedNav.set(nav);
    this.editingPageIndex.set(null);
    this.pageForm.reset();

    // ملاحظة: هذه تُرجع PageDto[] بدون id
    this.navService.getPages( nav.id).subscribe({
      next: dtos => {
        // UPDATED: تحويل للعرض المحلي (قد لا يحتوي id)
        this.pages.set((dtos.data ?? []).map(p => ({ ...p })));
      },
      // error: _ => this.toastr.error('تعذّر تحميل الصفحات.', 'خطأ')
    });
  }

  // ======= Create / Update NavItem =======
  submitNav() {
    if (this.navForm.invalid) {
      this.navForm.markAllAsTouched();
      this.toastr.warning('برجاء تصحيح الأخطاء في النموذج.', 'تنبيه');
      return;
    }

    const payload: NavItems = {
      label: this.navForm.value.label!,
      href: this.navForm.value.href!,
    };

    const idx = this.editingNavIndex();
    if (idx === null) {
      // CREATE
      this.navService.addNavItem(payload).subscribe({
        next: res => {
          // UPDATED: مزج العنصر الجديد في القائمة (نستخدم الـ DTO للعرض)
          const created: NavItemDto = {id:res.data.id!, label: res.data.label, href: res.data.href, pages: [] };
          this.navItems.update(list => [created, ...list]);
          this.navForm.reset();
          this.toastr.success('تم إضافة عنصر القائمة بنجاح.', 'تم');
        },
        error: _ => this.toastr.error('فشل إضافة عنصر القائمة.', 'خطأ')
      });
    } else {
      // UPDATE
      const current = this.navItems()[idx] as any;
      const id = current?.id;
      if (!id) {
        this.toastr.error('لا يمكن التحديث لأن المعرّف مفقود. تأكد أن الـ API يعيد الـ id.', 'خطأ');
        return;
      }
      this.navService.updateNavItem(id, payload).subscribe({
        next: res => {
          this.navItems.update(list => {
            const clone = [...list];
            clone[idx] = {id:res.data.id!, label: res.data.label, href: res.data.href, pages: clone[idx].pages };
            return clone;
          });
          this.cancelEditNav();
          this.toastr.success('تم تحديث عنصر القائمة.', 'تم');
        },
        error: _ => this.toastr.error('فشل تحديث عنصر القائمة.', 'خطأ')
      });
    }
  }

  startEditNav(index: number) {
    this.editingNavIndex.set(index);
    const item = this.navItems()[index];
    this.navForm.setValue({ label: item.label, href: item.href });
  }

  cancelEditNav() {
    this.editingNavIndex.set(null);
    this.navForm.reset();
  }

  deleteNav(index: number) {
    const item: any = this.navItems()[index];
    const id = item?.id;
    if (!id) {
      this.toastr.error('لا يمكن الحذف لأن المعرّف غير متاح من الـ DTO. حدّث الـ API لإرجاع id.', 'خطأ');
      return;
    }
    this.navService.deleteNavItem(id).subscribe({
      next: _ => {
        this.navItems.update(list => list.filter((_, i) => i !== index));
        // إن كان المحذوف هو المحدد، نظّف اللوحة
        if (this.selectedNav() && this.selectedNav()!.label === item.label && this.selectedNav()!.href === item.href) {
          this.selectedNav.set(null);
          this.pages.set([]);
        }
        this.toastr.success('تم حذف عنصر القائمة.', 'تم');
      },
      error: _ => this.toastr.error('فشل حذف عنصر القائمة.', 'خطأ')
    });
  }

  // ======= Create / Update Page =======
  submitPage() {
    if (!this.selectedNav()) {
      this.toastr.info('اختر عنصر قائمة أولاً.', 'معلومة');
      return;
    }

    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      this.toastr.warning('برجاء تصحيح الأخطاء في نموذج الصفحة.', 'تنبيه');
      return;
    }
    
    const selected: any = this.selectedNav();
    const navId = selected?.id;
    if (!navId) {
      this.toastr.error('لا يمكن إضافة/تحديث صفحة لأن معرّف عنصر القائمة غير متاح. تأكد من أن الـ API يعيد id.', 'خطأ');
      return;
    }

    const pagePayload: Pages = {
      subTilte: this.pageForm.value.subTilte!,
      subLink: this.pageForm.value.subLink!,
      navItemsId: navId
    };
    
    const pIdx = this.editingPageIndex();
    if (pIdx === null) {
      // CREATE Page
      this.navService.addPage(navId, pagePayload).subscribe({
        next: res => {
          // UPDATED: أضف الصفحة مع id إن عاد من الـ API
          const created: PageDto = {
            id: res.data.id!,
            subTilte: res.data.subTilte,
            subLink: res.data.subLink
          };
          this.pages.update(list => [created, ...list]);
          this.pageForm.reset();
          this.toastr.success('تم إضافة الصفحة.', 'تم');
        },
        error: _ => this.toastr.error('فشل إضافة الصفحة.', 'خطأ')
      });
    } else {
    
      // UPDATE Page
      const existing = this.pages()[pIdx];
      if (!existing.id) {
        this.toastr.error('لا يمكن تحديث الصفحة لأن المعرّف غير متاح من مصدر البيانات.', 'خطأ');
        return;
      }
      this.navService.updatePage(existing.id, pagePayload).subscribe({
        next: res => {
          this.pages.update(list => {
            const clone = [...list];
            clone[pIdx] = {
              id: existing.id,
              subTilte: res.data.subTilte,
              subLink: res.data.subLink
            };
            return clone;
          });
          this.cancelEditPage();
          this.toastr.success('تم تحديث الصفحة.', 'تم');
        },
        error: _ => this.toastr.error('فشل تحديث الصفحة.', 'خطأ')
      });
    }
  }

  startEditPage(index: number) {
    debugger
    this.editingPageIndex.set(index);
    const pg = this.pages()[index];
    this.pageForm.setValue({ subTilte: pg.subTilte, subLink: pg.subLink });
  }

  cancelEditPage() {
    this.editingPageIndex.set(null);
    this.pageForm.reset();
  }

  deletePage(index: number) {
    const pg = this.pages()[index];
    if (!pg.id) {
      this.toastr.error('لا يمكن حذف الصفحة لأن المعرّف غير متاح من الـ DTO.', 'خطأ');
      return;
    }
    this.navService.deletePage(pg.id).subscribe({
      next: _ => {
        this.pages.update(list => list.filter((_, i) => i !== index));
        this.toastr.success('تم حذف الصفحة.', 'تم');
      },
      error: _ => this.toastr.error('فشل حذف الصفحة.', 'خطأ')
    });
  }

  // ======= Helpers for template =======
  get fNav() { return this.navForm.controls; }
  get fPage() { return this.pageForm.controls; }
}
