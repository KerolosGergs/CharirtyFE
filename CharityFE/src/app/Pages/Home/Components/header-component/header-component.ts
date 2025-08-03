import { TostarServ } from './../../../../Shared/tostar-serv';
import { Component, inject, OnInit } from '@angular/core';
import { MainButton } from "../../../../Shared/main-button/main-button";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { AuthServ } from '../../../../Auth/Services/auth-serv';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header-component',
  imports: [MainButton,FontAwesomeModule ,RouterLink,NgClass],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent implements OnInit {
  AuthSer = inject(AuthServ);
  token: string | null  = null;
  router = inject(Router);
  TostarServ = inject(TostarServ);
    Role = this.AuthSer.getRole();
    accountName = this.AuthSer.getUserName();
      // accountName = 'اسم المستخدم'; // Replace with actual account name or fetch from service

ngOnInit(): void {
 
    this.token = this.AuthSer.getToken();
  
}

Dashbord() {
  // Navigate to dashboard or trigger desired function
 
  debugger
  if (this.Role === 'Admin')
    this.router.navigate(['/dashboard']);
  else if (this.Role === 'Advisor')
    this.router.navigate(['/advisor-dashboard']);
  else if (this.Role === 'Mediation')
    this.router.navigate(['/reconcile-dashboard']);
  else 
    this.AuthSer.logout();
}

login() {
  this.router.navigate(['/login']);
}
go(){
  // this.router.navigate(['http://109.166.90.247/Login.aspx']);
}
logout() {
  this.AuthSer.logout();
  window.location.reload();  // Optional: reload to reflect changes
}
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

