import { Component, inject, input, Input } from '@angular/core';

@Component({
  selector: 'app-header-component-consultant',
  imports: [],
  templateUrl: './header-component-consultant.html',
  styleUrl: './header-component-consultant.scss'
})
export class HeaderComponentConsultant {
  // @Input() title!: string  ;
  // @Input() description!: string ;

  title=input<string>();
  description=input<string>();
}
