import { Component } from '@angular/core';
import { MainButton } from "../../../../Shared/main-button/main-button";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [MainButton,FontAwesomeModule ,RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent {
 token: string | null = null;


ngOnInit(): void {
  if(typeof window !== 'undefined' ) {
    this.token = localStorage.getItem('authToken');
  }
}

Dashbord() {
  // Navigate to dashboard or trigger desired function
  console.log('Dashboard clicked');
}

login() {
  // Navigate to login or trigger desired function
  console.log('Login clicked');
}

logout() {
  localStorage.removeItem('authToken');
  window.location.reload();  // Optional: reload to reflect changes
}
}