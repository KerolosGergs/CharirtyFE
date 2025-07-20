import { Component } from '@angular/core';
import { Appointment } from '../../../../../../Core/Services/test';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '../../../../../../Core/Services/calendar.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-date-details',
  imports: [CommonModule],
  templateUrl: './date-details.html',
  styleUrl: './date-details.scss'
})
export class DateDetails {
   appointment: Appointment | undefined;

  constructor(
    private route: ActivatedRoute,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.appointment = this.calendarService
        .getCurrentState()
        .appointments.find(a => a.id === id);
    }
  }
}
