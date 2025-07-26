import { Component } from '@angular/core';
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { Nav } from "../../../Home/Components/nav/nav";
import { RouterModule } from "@angular/router";
import { Footer } from "../../../../Shared/footer/footer";

@Component({
  selector: 'app-volunteer',
  imports: [HeaderComponent, Nav, RouterModule, Footer],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss'
})
export class Volunteer {

}
