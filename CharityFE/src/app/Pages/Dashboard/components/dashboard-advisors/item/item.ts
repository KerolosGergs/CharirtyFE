import { Component, Input } from '@angular/core';
import { DropdownList } from "./dropdown-list/dropdown-list";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [DropdownList,CommonModule ],
  templateUrl: './item.html',
  styleUrl: './item.scss'
})
export class Item {

  @Input() itemA! : any 

   openedDropdown = false;

  toggleDropdown() {
    this.openedDropdown = !this.openedDropdown;
    console.log("Dropdown toggled:", this.openedDropdown);
  }
  loglog(){
    console.log("hello");
    
  }

formatDate(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
