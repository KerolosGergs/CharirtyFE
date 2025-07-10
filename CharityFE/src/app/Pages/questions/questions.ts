import { Component } from '@angular/core';
import { HeaderComponent } from "../Home/Components/header-component/header-component";
import { Nav } from "../Home/Components/nav/nav";
import { Footer } from "../../Shared/footer/footer";

@Component({
  selector: 'app-questions',
  imports: [HeaderComponent, Nav, Footer],
  templateUrl: './questions.html',
  styleUrl: './questions.scss'
})
export class Questions {

}
