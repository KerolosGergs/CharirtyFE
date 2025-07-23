import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HelpType } from '../../models/help-type.model';
import { HelpTypeService } from '../../services/help-type.service';
import { TostarServ } from '../../../../../../Shared/tostar-serv';

@Component({
  selector: 'app-help-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './help-types.html',
  styleUrl: './help-types.scss'
})
export class HelpTypesComponent implements OnInit {
  helpTypes: HelpType[] = [];
  currentHelpType: HelpType = { name: '', description: '' };
  showModal = false;
  showDeleteModal = false;
  isEditMode = false;
  isLoading = false;
  deleteId: number | null = null;

  // Search and pagination properties
  searchTerm: string = '';
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  filteredHelpTypes: HelpType[] = [];
  paginatedHelpTypes: HelpType[] = [];

  constructor(
    private helpTypeService: HelpTypeService,
    private tostarServ: TostarServ
  ) {}

  ngOnInit() {
    this.loadHelpTypes();
  }

  /**
   * Load help types from the service
   */
  loadHelpTypes() {
    this.isLoading = true;
    this.helpTypeService.getHelpTypes().subscribe({
      next: (types) => {
        this.helpTypes = types;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading help types:', error);
        // this.tostarServ.showError('Failed to load help types');
        this.isLoading = false;
      }
    });
  }

  /**
   * Handle search input changes
   */
  onSearchChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  /**
   * Clear search input
   */
  clearSearch() {
    this.searchTerm = '';
    this.onSearchChange();
  }

  /**
   * Handle items per page change
   */
  onItemsPerPageChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  /**
   * Apply search filters to the help types
   */
  applyFilters() {
    const term = this.searchTerm.trim().toLowerCase();
    
    if (!term) {
      this.filteredHelpTypes = [...this.helpTypes];
    } else {
      this.filteredHelpTypes = this.helpTypes.filter(
        (type) =>
          type.name.toLowerCase().includes(term) || 
          type.description.toLowerCase().includes(term)
      );
    }
    
    this.updatePagination();
  }

  /**
   * Update pagination based on filtered results
   */
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredHelpTypes.length / this.itemsPerPage);
    
    // Ensure current page is valid
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedHelpTypes = this.filteredHelpTypes.slice(start, end);
  }

  /**
   * Change to a specific page
   */
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  /**
   * Get array of page numbers for pagination
   */
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  /**
   * Get visible page numbers with ellipsis for large page counts
   */
  getVisiblePageNumbers(): (number | string)[] {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, this.currentPage - delta); 
         i <= Math.min(this.totalPages - 1, this.currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (this.currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (this.currentPage + delta < this.totalPages - 1) {
      rangeWithDots.push('...', this.totalPages);
    } else if (this.totalPages > 1) {
      rangeWithDots.push(this.totalPages);
    }

    // Remove duplicates
    return rangeWithDots.filter((item, index, arr) => 
      index === 0 || item !== arr[index - 1]
    );
  }

  /**
   * Get the starting index for current page display
   */
  getStartIndex(): number {
    return this.filteredHelpTypes.length === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  /**
   * Get the ending index for current page display
   */
  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredHelpTypes.length);
  }

  /**
   * Open modal for adding new help type
   */
  openAddModal() {
    this.currentHelpType = { name: '', description: '' };
    this.isEditMode = false;
    this.showModal = true;
    
    // Focus on name input after modal opens
    setTimeout(() => {
      const nameInput = document.getElementById('helpTypeName') as HTMLInputElement;
      if (nameInput) {
        nameInput.focus();
      }
    }, 100);
  }

  /**
   * Open modal for editing existing help type
   */
  openEditModal(helpType: HelpType) {
    this.currentHelpType = { ...helpType };
    this.isEditMode = true;
    this.showModal = true;
    
    // Focus on name input after modal opens
    setTimeout(() => {
      const nameInput = document.getElementById('helpTypeName') as HTMLInputElement;
      if (nameInput) {
        nameInput.focus();
      }
    }, 100);
  }

  /**
   * Close the add/edit modal
   */
  closeModal() {
    this.showModal = false;
    this.currentHelpType = { name: '', description: '' };
    this.isEditMode = false;
  }

  /**
   * Save help type (add or update)
   */
  saveHelpType() {
    // Validate required fields
    if (!this.currentHelpType.name?.trim() || !this.currentHelpType.description?.trim()) {
      this.tostarServ.showError('من فضلك ادخل الاسم والوصف');
      return;
    }

    this.isLoading = true;

    if (this.isEditMode && this.currentHelpType.id) {
      // Update existing help type
      this.helpTypeService.updateHelpType(this.currentHelpType.id, this.currentHelpType)
        .subscribe({
          next: () => {
            this.loadHelpTypes();
            this.closeModal();
            this.tostarServ.showSuccess('تم التحديث بنجاح');
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error updating help type:', error);
            this.tostarServ.showError('حدث خطاء في التحديث');
            this.isLoading = false;
          }
        });
    } else {
      // Create new help type
      this.helpTypeService.createHelpType(this.currentHelpType)
        .subscribe({
          next: () => {
            this.loadHelpTypes();
            this.closeModal();
            this.tostarServ.showSuccess('تم الحفظ بنجاح');
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error creating help type:', error);
            this.tostarServ.showError('حدث خطاء في الحفظ');
            this.isLoading = false;
          }
        });
    }
  }

  /**
   * Open delete confirmation modal
   */
  deleteHelpType(id: number) {
    this.deleteId = id;
    this.showDeleteModal = true;
  }

  /**
   * Close delete confirmation modal
   */
  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deleteId = null;
  }

  /**
   * Confirm and execute delete operation
   */
  confirmDelete() {
    if (!this.deleteId) {
      return;
    }

    this.isLoading = true;
    
    this.helpTypeService.deleteHelpType(this.deleteId)
      .subscribe({
        next: () => {
          this.loadHelpTypes();
          this.closeDeleteModal();
          this.tostarServ.showSuccess('تم حذف النوع بنجاح');
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting help type:', error);
          this.tostarServ.showError('حدث خطاء في حذف النوع');
          this.isLoading = false;
        }
      });
  }
}
