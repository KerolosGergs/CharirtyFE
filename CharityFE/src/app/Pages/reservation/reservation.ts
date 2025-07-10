import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../Home/Components/header-component/header-component';
import { Nav } from '../Home/Components/nav/nav';
import { Footer } from '../../Shared/footer/footer';

@Component({
  selector: 'app-reservation',
  imports: [HeaderComponent, Nav, Footer],
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss'
})
export class Reservation {

}
