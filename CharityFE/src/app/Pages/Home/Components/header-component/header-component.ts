import { Component, inject, OnInit } from '@angular/core';
import { MainButton } from "../../../../Shared/main-button/main-button";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { AuthServ } from '../../../../Auth/Services/auth-serv';

@Component({
  selector: 'app-header-component',
  imports: [MainButton,FontAwesomeModule ,RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent implements OnInit {
  AuthSer = inject(AuthServ);
  token: string | null  = null;
  router = inject(Router);

ngOnInit(): void {
 
    this.token = this.AuthSer.getToken();
  
}

Dashbord() {
  // Navigate to dashboard or trigger desired function
  if(this.AuthSer.getRole()=="Admin"){
    this.router.navigate(['/Dashboard']);
  }
}

login() {
  this.router.navigate(['/login']);
}

logout() {
  this.AuthSer.logout();
  window.location.reload();  // Optional: reload to reflect changes
}
}

