import { Component } from '@angular/core';
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { Nav } from "../../../Home/Components/nav/nav";
import { Footer } from "../../../../Shared/footer/footer";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-invest-layout',
  imports: [HeaderComponent, Nav, RouterOutlet, Footer],
  templateUrl: './invest-layout.html',
  styleUrl: './invest-layout.scss'
})
export class InvestLayout {

}
