import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../Home/Components/header-component/header-component';
import { Nav } from '../Home/Components/nav/nav';
import { Footer } from '../../Shared/footer/footer';
import { AdvisorAvailabilityManagerComponent } from './components/advisor-availability-manager/advisor-availability-manager/advisor-availability-manager.component';

@Component({
  selector: 'app-reservation',
  imports: [HeaderComponent, Nav, Footer,AdvisorAvailabilityManagerComponent],
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss'
})
export class Reservation {
  availableDates: Date[] = [];
  calendarWeeks: any[] = [];

  ngOnInit() {}

  loadAdvisorAvailability() {
    // محاكاة بيانات من API
    this.availableDates = [
      new Date(2024, 6, 10),
      new Date(2024, 6, 12),
      new Date(2024, 6, 15)
    ];
    this.buildCalendar();
  }

  buildCalendar() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const totalDays = endOfMonth.getDate();

    const days = [];
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      const available = this.availableDates.some(d => d.toDateString() === date.toDateString());
      days.push({ date, available });
    }

    this.calendarWeeks = [];
    for (let i = 0; i < days.length; i += 7) {
      this.calendarWeeks.push(days.slice(i, i + 7));
    }
  }

  selectDate(day: any) {
    if (day.available) {
      alert('تم اختيار الموعد: ' + day.date.toLocaleDateString());
    }
  }

}
