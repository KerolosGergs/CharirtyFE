import { Component } from '@angular/core';
import { RegisterForm } from "../Components/register-form/register-form";
import { Footer } from "../../Shared/footer/footer";

@Component({
  selector: 'app-register',
  imports: [RegisterForm, Footer],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

}
