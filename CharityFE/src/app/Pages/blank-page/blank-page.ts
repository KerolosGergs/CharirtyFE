import { Component } from '@angular/core';
import { HeaderComponent } from "../Home/Components/header-component/header-component";
import { Footer } from "../../Shared/footer/footer";
import { Nav } from "../Home/Components/nav/nav";

@Component({
  selector: 'app-blank-page',
  imports: [HeaderComponent, Footer, Nav],
  templateUrl: './blank-page.html',
  styleUrl: './blank-page.scss'
})
export class BlankPage {

}
