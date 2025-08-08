import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicPagesService, DynamicPage } from '../../dynamic-pages.service';

@Component({
  selector: 'app-dynamic-page-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-page-dropdown.component.html',
  styleUrl: './dynamic-page-dropdown.component.scss'
})
export class DynamicPageDropdownComponent implements OnInit {
  private readonly dynamicPagesService = inject(DynamicPagesService);
  private readonly router = inject(Router);

  pages: DynamicPage[] = [];
  isLoading = false;
  error = '';
  selectedId: number | null = null;

  ngOnInit(): void {
    this.isLoading = true;
    this.dynamicPagesService.getPages().subscribe({
      next: (resp) => {
        this.pages = resp?.data ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.error = 'تعذر تحميل الصفحات';
        this.isLoading = false;
      },
    });
  }

  onSelect(selected: number | null): void {
    if (selected == null) return;
    this.selectedId = selected;
    this.router.navigate(['/dynamic-page', selected]);
  }
}


