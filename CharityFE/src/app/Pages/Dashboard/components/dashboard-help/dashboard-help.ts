import { Component } from '@angular/core';
import { HelpRequestsComponent } from "./components/help-requests/help-requests";
import { HelpTypesComponent } from "./components/help-types/help-types";

@Component({
  selector: 'app-dashboard-help',
  imports: [HelpRequestsComponent, HelpTypesComponent],
  templateUrl: './dashboard-help.html',
  styleUrl: './dashboard-help.scss'
})
export class DashboardHelp {
activeTab: string = 'help-requests';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
