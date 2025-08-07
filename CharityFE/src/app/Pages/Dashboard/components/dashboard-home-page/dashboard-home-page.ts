import { Component, signal } from '@angular/core';
import { DashboardTrendSection } from "./components/dashboard-trend-section/dashboard-trend-section";
import { DashboardVideoSection } from "./components/dashboard-video-section/dashboard-video-section";
import { DashboardHeroSection } from "./components/dashboard-hero-section/dashboard-hero-section";
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard-home-page',
  standalone: true,
  imports: [DashboardTrendSection, DashboardVideoSection, DashboardHeroSection,FormsModule,NgClass],
  templateUrl: './dashboard-home-page.html',
  styleUrl: './dashboard-home-page.scss'
})
export class DashboardHomePage {
 sidebarCollapsed = signal(true);
  activeSection = signal('hero');

  toggleSidebar() {
    this.sidebarCollapsed.update(value => !value);
  }

  setActiveSection(section: string) {
    this.activeSection.set(section);
    if (!this.sidebarCollapsed()) {
      this.toggleSidebar();
    }
  }
}
