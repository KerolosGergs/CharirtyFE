import { AuthServ } from './../../../../Auth/Services/auth-serv';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { Advisor } from '../../../../Core/Services/advisor';
import { Router } from '@angular/router';
import { AdvisorAvailabilityDTOO, ConsultationType } from '../../../../Core/Interfaces/iadvisorappointment'
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule }  from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard-date',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule,
    HttpClientModule,

    // Material Imports
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule],
  templateUrl: './dashboard-date.html',
  styleUrls: ['./dashboard-date.scss']
})
export class DashboardDate{
  currentDate: Date = new Date();
  currentWeekStart!: Date;
  weekDays: Date[] = [];
  timeSlots: string[] = [];
  auth = inject(AuthServ);
  advisorId = +this.auth.getId(); // Example Advisor ID
  availableSlots: AdvisorAvailabilityDTOO[] = [];

  constructor(
    private advisorService: Advisor,
    private router: Router
  ) {
    this.generateTimeSlots();
    this.setWeek(this.currentDate);
  }

  ngOnInit(): void {
    this.fetchSlotsForCurrentWeek();
  }

  // Generates time labels for the entire day
  generateTimeSlots(): void {
    for (let i = 0; i < 24; i++) {
      this.timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
    }
  }

  // Sets the current week based on a given date
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

  // Fetches slots for all days in the current week view
  fetchSlotsForCurrentWeek(): void {
    this.availableSlots = []; // Clear previous slots
    this.weekDays.forEach(day => {
      this.advisorService.getAvailableSlots(this.advisorId, day).subscribe({
        next: (slots) => {
          this.availableSlots.push(...slots);
        },
        error: (err) => console.error(`Failed to fetch slots for ${day.toDateString()}`, err)
      });
    });
  }

  // Changes the week forward or backward
  changeWeek(direction: number): void {
    const newDate = new Date(this.currentWeekStart);
    newDate.setDate(this.currentWeekStart.getDate() + (7 * direction));
    this.setWeek(newDate);
    this.fetchSlotsForCurrentWeek();
  }

  // Handles date selection from the date picker
  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      this.setWeek(event.value);
      this.fetchSlotsForCurrentWeek();
    }
  }

  // Filters slots for a specific day from the main list
  getSlotsForDay(day: Date): AdvisorAvailabilityDTOO[] {
    return this.availableSlots.filter(slot => {
      const slotDate = new Date(slot.date);
      return slotDate.toDateString() === day.toDateString();
    });
  }

  // Calculates the dynamic style for a slot card
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

  // Returns a CSS class based on the consultation type for coloring
  getSlotColor(type: ConsultationType): string {
    switch (type) {
      case ConsultationType.Online: return 'color-online';
      case ConsultationType.InPerson: return 'color-inperson';
      case ConsultationType.Both: return 'color-both';
      default: return '';
    }
  }

  // Handles click event on a slot card
  onSlotClick(slotId: number): void {
    console.log(`Navigating for slot ID: ${slotId}`);
    // Example route, change '/booking' to your actual route
    this.router.navigate(['/advisor-dashboard/date-details', slotId]);
  }
}
