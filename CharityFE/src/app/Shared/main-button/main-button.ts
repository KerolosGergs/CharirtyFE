import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-main-button',
  imports: [],
  templateUrl: './main-button.html',
  styleUrl: './main-button.scss'
})
export class MainButton {
  buttontext = input<string>();
  iconButton=input<string>() ;
  @Input() buttonFunction :   ()=> void = () => {};

onDiscoverServices() {
throw new Error('Method not implemented.');
}

}
