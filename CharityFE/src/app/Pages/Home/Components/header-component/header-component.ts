import { Component } from '@angular/core';
import { MainButton } from "../../../../Shared/main-button/main-button";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-component',
  imports: [MainButton,FontAwesomeModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent {
 Dashbord(): void {
  console.log('Dashboard clicked');
};

/**
 *
 */
constructor() {

  library.add(faCoffee);
}
}

