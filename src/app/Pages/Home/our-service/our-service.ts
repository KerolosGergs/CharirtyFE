import { Component } from '@angular/core';
import { Nav } from "../Components/nav/nav";
import { HeaderComponent } from "../Components/header-component/header-component";
import { Hero } from "../Components/hero/hero";
import { Footer } from "../../../Shared/footer/footer";
import { ServiceComponent } from "../Components/service-component/service-component";
import { HeaderComponentConsultant } from "../../Consultant/Components/header-component-consultant/header-component-consultant";

@Component({
  selector: 'app-our-service',
  imports: [Nav, HeaderComponent, Footer, ServiceComponent, HeaderComponentConsultant],
  templateUrl: './our-service.html',
  styleUrl: './our-service.scss'
})
export class OurService {

}
