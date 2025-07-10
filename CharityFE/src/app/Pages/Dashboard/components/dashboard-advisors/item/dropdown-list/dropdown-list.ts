import { Component, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-dropdown-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dropdown-list.html',
  styleUrl: './dropdown-list.scss'
})
export class DropdownList {
  @Input() itemL! : any
}
