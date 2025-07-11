import { Component } from '@angular/core';
import { AdvisorAvailabilityManagerComponent } from "../advisor-availability-manager/advisor-availability-manager/advisor-availability-manager.component";

@Component({
  selector: 'app-reservation-form',
  imports: [AdvisorAvailabilityManagerComponent],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss'
})
export class ReservationForm {

}
