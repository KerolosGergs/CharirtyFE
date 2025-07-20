import { Component, OnInit } from '@angular/core';
import { HeaderComponentConsultant } from "../Components/header-component-consultant/header-component-consultant";
import { ContentConsultant } from '../Components/content/content';
import { Footer } from "../../../Shared/footer/footer";
import { Nav } from "../../Home/Components/nav/nav";
import { HeaderComponent } from "../../Home/Components/header-component/header-component";
import { Spinner } from "../../../Shared/spinner/spinner";
import { NotFound } from "../../not-found/not-found";

@Component({
  selector: 'app-consultant',
  imports: [HeaderComponentConsultant, ContentConsultant, Footer, Nav, HeaderComponent, Spinner, NotFound],
  templateUrl: './consultant.html',
  styleUrl: './consultant.scss'
})
export class Consultant implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
