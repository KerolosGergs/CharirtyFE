import { Component } from '@angular/core';
import { Nav } from "../../Home/Components/nav/nav";
import { RouterModule } from "@angular/router";
import { Footer } from "../../../Shared/footer/footer";
import { HeaderComponent } from "../../Home/Components/header-component/header-component";
import { Spinner } from "../../../Shared/spinner/spinner";

@Component({
  selector: 'app-about-layout',
  imports: [Nav, RouterModule, Footer, HeaderComponent, Spinner],
  templateUrl: './about-layout.html',
  styleUrl: './about-layout.scss'
})
export class AboutLayout {

}
