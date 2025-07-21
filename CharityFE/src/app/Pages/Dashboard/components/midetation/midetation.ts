import { Component, inject, OnInit } from '@angular/core';
import { Advisor } from '../../../../Core/Services/advisor';
import { advisor, IAdvisorResponse, ICategory } from '../../../../Core/Interfaces/advisor';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TostarServ } from '../../../../Shared/tostar-serv';
import { IMeditation, IMeditationResponse } from '../../../../Core/Interfaces/imeditaion';
import { MidetationServ } from '../../../../Core/Services/MidetationService/midetation-serv';

@Component({
  selector: 'app-midetation',
  imports: [RouterLink,CommonModule],
  templateUrl: './midetation.html',
  styleUrl: './midetation.scss'
})
export class Midetation implements OnInit {
 midetation: IMeditationResponse | null = null;
  filteredMeditations: IMeditation[] = [];
  isLoadingMidetations: boolean = true;
  _Meditation = inject(MidetationServ);
  _router = inject(Router)
  isOpen = false;
  isOpenEdit = false;
  isOpenDetails = false;

  selectedAdvisor!: advisor;
  tostar = inject(TostarServ);

  ngOnInit(): void {
    this.loadAdvisors()
  }
  loadAdvisors(): void {
    this.isLoadingMidetations = true;
    this._Meditation.getAllmidetations().subscribe({
      next: (data) => {
        if (data && data.success) {
          this.midetation = data;
          this.filteredMeditations = data.data;
        }
        this.isLoadingMidetations = false;
      },
      error: () => {
        this.isLoadingMidetations = false;
      }
    });
  }


  openCreateNew() {
    this._router.navigate(['dashboard/dashboard-midetation-new']);
  }




  deleteMeditation(ID: number) {

    this._Meditation.deletemidetation(ID).subscribe({
      next: (res) => {
        if (res.success) {
          this.tostar.showSuccess('تم حذف المستشار بنجاح');
          // console.log('Advisor deleted successfully:', res);
          this.loadAdvisors();

        } else {
          this.tostar.showError('خطاء في حذف المستشار');
          console.error('Error deleting advisor:', res);
        }
      },
      error: (err) => {
        this.tostar.showError('تأكد من أتصالك بالأنترنت');

        console.error('Error deleting advisor:', err);
      }
    })
  }
  loadAdvisorDetails(id: number): void {
    this._Meditation.getMidetationById(id).subscribe({
      next: (data) => {
        console.log('Advisor Details:', data);

        this._router.navigate
      },
      error: (err) => {
        console.error('Error loading advisor details:', err);
      }
    });
  }
}
