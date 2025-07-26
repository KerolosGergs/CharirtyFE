import { Component } from '@angular/core';
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { Nav } from "../../../Home/Components/nav/nav";
import { Footer } from "../../../../Shared/footer/footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-medcine-layout',
  imports: [HeaderComponent, Nav, RouterOutlet, Footer],
  templateUrl: './medcine-layout.html',
  styleUrl: './medcine-layout.scss'
})
export class MedcineLayout {

}
