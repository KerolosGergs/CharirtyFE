import { Component, inject, Input, OnInit } from '@angular/core';
import { advisor } from '../../../../../../Core/Interfaces/advisor';
import { Advisor } from '../../../../../../Core/Services/advisor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-advisors-details',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-advisors-details.html',
  styleUrl: './dashboard-advisors-details.scss'
})
export class DashboardAdvisorsDetails implements OnInit {

  _router = inject(ActivatedRoute)
  _advisor = inject(Advisor)

  advisor: any;


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

        this.advisor = res.data;
      },
      error(err) {
        console.log('Failed to fetch advisor:', err);

      }
    })
  }
}
