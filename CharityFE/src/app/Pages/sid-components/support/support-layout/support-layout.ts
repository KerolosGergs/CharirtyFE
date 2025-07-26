import { Component } from '@angular/core';
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { Nav } from "../../../Home/Components/nav/nav";
import { RouterModule } from "@angular/router";
import { Footer } from "../../../../Shared/footer/footer";

@Component({
  selector: 'app-support-layout',
  imports: [HeaderComponent, Nav, RouterModule, Footer],
  templateUrl: './support-layout.html',
  styleUrl: './support-layout.scss'
})
export class SupportLayout {

}
