import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MidetationServ } from '../../../../../../Core/Services/MidetationService/midetation-serv';
import { getMidetationById, IMeditation } from '../../../../../../Core/Interfaces/imeditaion';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-midetation-detatils',
  imports: [DatePipe],
  templateUrl: './midetation-detatils.html',
  styleUrl: './midetation-detatils.scss'
})
export class MidetationDetatils {

  _router = inject(ActivatedRoute)
  _mediation = inject(MidetationServ)

  Meditation!: IMeditation;


  ngOnInit(): void {
    this.getparam();
  }

  getparam() {
    this._router.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        this.getMeditationById(id);
      }
      else {
        console.error('Invalid advisor ID in route');
      }
    });
  }
  getMeditationById(id: number) {
    this._mediation.getMidetationById(id).subscribe({
      next: (res) => {
        console.log('data feched', res);

        this.Meditation = res.data;
      },
      error(err) {
        console.log('Failed to fetch advisor:', err);

      }
    })
  }
}
