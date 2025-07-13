import { Component } from '@angular/core';
import { Nav } from "../Components/nav/nav";
import { Hero } from "../Components/hero/hero";
import { HeaderComponent } from "../Components/header-component/header-component";
import { Footer } from "../../../Shared/footer/footer";
import {Content} from "../Components/content/content";
import { ServiceComponent } from "../Components/service-component/service-component";
import { VideoSection } from "../Components/video-section/video-section";
import { News } from "../Components/news/news";
import { Spinner } from '../../../Shared/spinner/spinner';
import { NotFound } from "../../not-found/not-found";
@Component({
  selector: 'app-home',
  imports: [Nav, Hero, HeaderComponent, Footer, Content, VideoSection, News, Spinner, NotFound],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
Fun(){
  console.log("hello");
};
}
