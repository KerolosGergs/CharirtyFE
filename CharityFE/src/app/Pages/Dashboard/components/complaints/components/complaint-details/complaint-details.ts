import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-complaint-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complaint-details.html',
  styleUrl: './complaint-details.scss'
})
export class ComplaintDetails {

  tabs = [
  { label: 'الملفات', icon: 'bi bi-file-earmark-arrow-up-fill' },
  { label: 'الصور', icon: 'bi bi-image' }
];


selectedTab = this.tabs[0]; // Default selection

selectTab(tab: any): void {
  this.selectedTab = tab;
}


  sendReply() {
  const reply = (document.getElementById('replyInput') as HTMLDivElement).innerHTML;
  console.log('Sending reply:', reply);
  // You can send it to a backend or clear it afterward
}

format(command: string) {
  document.execCommand(command, false, '');
}
}
