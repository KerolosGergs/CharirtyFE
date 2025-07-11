import { Component } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Footer } from '../../../../../Shared/footer/footer';
import { Nav } from '../../../../Home/Components/nav/nav';
import { HeaderComponent } from '../../../../Home/Components/header-component/header-component';
@Component({
  selector: 'app-advisor-availability-manager',
  standalone: true,
  imports: [CommonModule, MatCalendar, MatDatepickerModule, ],
  templateUrl: './advisor-availability-manager.component.html',
  styleUrl: './advisor-availability-manager.component.scss'
})
export class AdvisorAvailabilityManagerComponent {
  
  allowedDates: string[] = [
    '2025-07-15',
    '2025-07-17',
    '2025-07-20'
  ];

  availability: { [date: string]: string[] } = {
    '2025-07-15': ['9:00 AM', '10:00 AM', '11:00 AM'],
    '2025-07-17': ['1:00 PM', '2:00 PM', '3:00 PM'],
    '2025-07-20': ['5:00 PM', '6:00 PM']
  };

  selectedDate: Date | null = null;
  allHours: string[] = [];
  selectedTime: string | null = null;
  saveSuccess = false;
  saveError = '';

  /**
   * ✅ Filter for allowed dates
   */
  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const dateStr = this.formatDate(date);
    return this.allowedDates.includes(dateStr);
  };

  /**
   * ✅ Handle date selection
   */
  onDateChange(date: Date | null) {
    this.selectedDate = date;
    this.selectedTime = null;  // reset time when date changes

    if (date) {
      const key = this.formatDate(date);
      this.allHours = this.availability[key] || [];
    } else {
      this.allHours = [];
    }
  }

  /**
   * ✅ Handle time selection
   */
  selectTime(hour: string) {
    this.selectedTime = hour;
  }

  /**
   * ✅ Save selected date & time
   */
  saveAvailability() {
    debugger
    // if (!this.selectedDate) {
    //   this.saveError = 'من فضلك اختر تاريخًا صالحًا';
    //   return;
    // }

    // if (!this.selectedTime) {
    //   this.saveError = 'من فضلك اختر موعدًا متاحًا';
    //   return;
    // }

    // this.saveSuccess = true;
    // this.saveError = '';

    // setTimeout(() => this.saveSuccess = false, 2000);
  }

  /**
   * ✅ Format date as YYYY-MM-DD
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}