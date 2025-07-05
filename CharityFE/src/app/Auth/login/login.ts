import { Component } from '@angular/core';
import { LoginForm } from "../Components/login-form/login-form";
import { Footer } from '../../Shared/footer/footer';


@Component({
  selector: 'app-login',
  imports: [LoginForm, Footer],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

}
