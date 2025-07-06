import { Component } from '@angular/core';
import { Nav } from "../Components/nav/nav";
import { Hero } from "../Components/hero/hero";
import { HeaderComponent } from "../Components/header-component/header-component";
import { Footer } from "../../../Shared/footer/footer";
import {Content} from "../Components/content/content";
import { ServiceComponent } from "../Components/service-component/service-component";
@Component({
  selector: 'app-home',
  imports: [Nav, Hero, HeaderComponent, Footer, Content, ServiceComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
Fun(){
  console.log("hello");
};
}
