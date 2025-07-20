import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './Pages/Home/Components/nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'CharityFE';
}
