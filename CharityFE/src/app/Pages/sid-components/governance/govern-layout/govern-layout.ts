import { Component } from '@angular/core';
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { Nav } from "../../../Home/Components/nav/nav";
import { Footer } from "../../../../Shared/footer/footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-govern-layout',
  imports: [HeaderComponent, RouterOutlet, Nav, Footer],
  templateUrl: './govern-layout.html',
  styleUrl: './govern-layout.scss'
})
export class GovernLayout {

}
