import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../Home/Components/header-component/header-component';
import { Nav } from '../Home/Components/nav/nav';
import { Footer } from '../../Shared/footer/footer';
import { ReservationForm } from "./components/reservation-form/reservation-form";
import { AdvisorProfile } from "./components/advisor-profile/advisor-profile";
import { Spinner } from "../../Shared/spinner/spinner";
import { NotFound } from "../not-found/not-found";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [HeaderComponent, Nav, Footer, ReservationForm, AdvisorProfile, Spinner, NotFound],
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss'
})
export class Reservation {


}
