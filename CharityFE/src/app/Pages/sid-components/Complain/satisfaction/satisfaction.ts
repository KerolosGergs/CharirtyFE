import { Component } from '@angular/core';
import { Nav } from "../../../Home/Components/nav/nav";
import { Footer } from "../../../../Shared/footer/footer";
import { HeaderComponent } from "../../../Home/Components/header-component/header-component";
import { HeaderComponentConsultant } from "../../../Consultant/Components/header-component-consultant/header-component-consultant";
import { ContentConsultant } from "../../../Consultant/Components/content/content";

@Component({
  selector: 'app-satisfaction',
  imports: [Nav, Footer, HeaderComponent],
  templateUrl: './satisfaction.html',
  styleUrl: './satisfaction.scss'
})
export class Satisfaction {

  pdfZoom: number = 1.0;
  
  zoomIn() {
    this.pdfZoom += 0.25;
  }

  zoomOut() {
    if (this.pdfZoom > 0.5) {
      this.pdfZoom -= 0.25;
    }
  }
   selectedIndex: number = 0;

  showPdf(index: number) {
    this.selectedIndex = index;
  }

}
