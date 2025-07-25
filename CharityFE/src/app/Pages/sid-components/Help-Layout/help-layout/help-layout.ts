import { Component } from '@angular/core';
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { Nav } from "../../../Home/Components/nav/nav";
import { RouterModule } from "@angular/router";
import { Spinner } from "../../../../Shared/spinner/spinner";
import { Footer } from "../../../../Shared/footer/footer";

@Component({
  selector: 'app-help-layout',
  imports: [HeaderComponent, Nav, RouterModule, Spinner, Footer],
  templateUrl: './help-layout.html',
  styleUrl: './help-layout.scss'
})
export class HelpLayout {

}
