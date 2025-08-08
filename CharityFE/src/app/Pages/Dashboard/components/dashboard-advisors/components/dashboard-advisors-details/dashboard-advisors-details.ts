import { Component, inject, Input, OnInit } from '@angular/core';
import { advisor } from '../../../../../../Core/Interfaces/advisor';
import { Advisor } from '../../../../../../Core/Services/advisor';
import { ActivatedRoute } from '@angular/router';
import { Appointments } from "./components/appointments/appointments";
import { PreviousConsultations } from "./components/previous-consultations/previous-consultations";

@Component({
  selector: 'app-dashboard-advisors-details',
  standalone: true,
  imports: [Appointments],
  templateUrl: './dashboard-advisors-details.html',
  styleUrl: './dashboard-advisors-details.scss'
})
export class DashboardAdvisorsDetails implements OnInit {

  _router = inject(ActivatedRoute)
  _advisor = inject(Advisor)

  advisor!: advisor;


  ngOnInit(): void {
    this.getparam();
  }

  getparam() {
    this._router.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        this.getAdvisorById(id);
      }
      else {
        console.error('Invalid advisor ID in route');
      }
    });
  }
  getAdvisorById(id: number) {
    this._advisor.getAdvisorById(id).subscribe({
      next: (res) => {
        console.log('data feched', res);
        console.log(res.data);
        
        this.advisor = res.data;
      },
      error(err) {
        console.log('Failed to fetch advisor:', err);

      }
    })
  }
}
