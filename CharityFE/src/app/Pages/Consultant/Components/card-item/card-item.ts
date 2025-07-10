import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { advisor, IAdvisor } from '../../../../Core/Interfaces/advisor';

@Component({
  selector: 'app-card-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './card-item.html',
  styleUrl: './card-item.scss',
  standalone: true
})
export class CardItem {
  @Input() itemS!: advisor;

  constructor(private router: Router) {}

  goToDetails(): void {
    if (this.itemS) {
      this.router.navigate(['/advisor-details'], {
        queryParams: { 
          id: this.itemS.id
        }
      });
    }
  }

  goToReservation(): void {
    if (this.itemS) {
      this.router.navigate(['/advisor-reservation'], {
        queryParams: { 
          id: this.itemS.id
        }
      });
    }
  }
}
