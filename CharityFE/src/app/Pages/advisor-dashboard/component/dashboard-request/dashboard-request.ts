import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Router } from '@angular/router';
import { Advisor } from '../../../../Core/Services/advisor';
import { AdvisorAvailabilityDTOO, ConsultationType } from '../../../../Core/Interfaces/iadvisorappointment';
import { AdvisorRequest } from '../../../../Core/Interfaces/iadvisorrequest';

@Component({
  selector: 'app-dashboard-request',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    // Angular Material
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './dashboard-request.html',
  styleUrl: './dashboard-request.scss'
})
export class DashboardRequest {
  currentDate: Date = new Date();
  currentWeekStart!: Date;
  weekDays: Date[] = [];
  timeSlots: string[] = [];

  advisorId = 1; // Change this to dynamic if needed
  availableSlots: AdvisorAvailabilityDTOO[] = [];
  advisorRequests: AdvisorRequest[] = [];

  constructor(
    private advisorService: Advisor,
    private router: Router
  ) {
    this.generateTimeSlots();
    this.setWeek(this.currentDate);
  }

  ngOnInit(): void {
    this.fetchSlotsForCurrentWeek();
    this.fetchAdvisorRequests();
  }

  generateTimeSlots(): void {
    for (let i = 0; i < 24; i++) {
      this.timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
    }
  }

  setWeek(date: Date): void {
    this.currentDate = new Date(date);
    const dayOfWeek = this.currentDate.getDay();
    this.currentWeekStart = new Date(this.currentDate.setDate(this.currentDate.getDate() - dayOfWeek));
    
    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(this.currentWeekStart);
      weekDay.setDate(this.currentWeekStart.getDate() + i);
      this.weekDays.push(weekDay);
    }
  }

  fetchSlotsForCurrentWeek(): void {
    this.availableSlots = [];
    this.weekDays.forEach(day => {
      this.advisorService.getAvailableSlots(this.advisorId, day).subscribe({
        next: (slots) => {
          this.availableSlots.push(...slots);
        },
        error: (err) => {
          console.error(`❌ Failed to fetch slots for ${day.toDateString()}`, err);
        }
      });
    });
  }

  fetchAdvisorRequests(): void {
    this.advisorService.getRequestsByAdvisorId(this.advisorId).subscribe({
      next: (requests) => {
        this.advisorRequests = requests;
      },
      error: (err) => {
        console.error('❌ Failed to fetch advisor requests:', err);
      }
    });
  }

  changeWeek(direction: number): void {
    const newDate = new Date(this.currentWeekStart);
    newDate.setDate(this.currentWeekStart.getDate() + (7 * direction));
    this.setWeek(newDate);
    this.fetchSlotsForCurrentWeek();
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      this.setWeek(event.value);
      this.fetchSlotsForCurrentWeek();
    }
  }

  getSlotsForDay(day: Date): AdvisorAvailabilityDTOO[] {
    return this.availableSlots.filter(slot => {
      const slotDate = new Date(slot.date);
      return slotDate.toDateString() === day.toDateString();
    });
  }

  getSlotStyle(slot: AdvisorAvailabilityDTOO): any {
    const [hours, minutes] = slot.time.split(':').map(Number);
    const [dHours, dMinutes] = slot.duration.split(':').map(Number);

    const pixelsPerHour = 60;
    const top = (hours * pixelsPerHour) + (minutes * (pixelsPerHour / 60));
    const height = (dHours * pixelsPerHour) + (dMinutes * (pixelsPerHour / 60));

    return {
      'top.px': top,
      'height.px': height
    };
  }

  getSlotColor(type: ConsultationType): string {
    switch (type) {
      case ConsultationType.Online: return 'color-online';
      case ConsultationType.InPerson: return 'color-inperson';
      case ConsultationType.Both: return 'color-both';
      default: return '';
    }
  }

  onSlotClick(slotId: number): void {
    console.log(`🔗 Navigating to slot ID: ${slotId}`);
    this.router.navigate(['/advisor-dashboard/date-details', slotId]);
  }
}
