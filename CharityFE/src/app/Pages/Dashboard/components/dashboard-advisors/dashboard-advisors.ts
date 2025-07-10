import { Component } from '@angular/core';
import { Item } from "./item/item";
import { Consultant } from '../../../../Core/Interfaces/consultant';

@Component({
  selector: 'app-dashboard-advisors',
  standalone: true,
  imports: [Item],
  templateUrl: './dashboard-advisors.html',
  styleUrl: './dashboard-advisors.scss'
})
export class DashboardAdvisors {
  isOpen = true;
  openList(){
    this.isOpen = !this.isOpen;
  }

  consultants: Consultant[] = [
    {
      id: 1,
      name: 'سعيد أحمد',
      email: 'sa123ah@gmail.com',
      status: 'pending',
      joinDate: new Date('2025-02-23'),
      avatar: 'Images/advisor.jpg',
      selected: false
    },
    {
      id: 2,
      name: 'سعيد أحمد',
      email: 'sa123ah@gmail.com',
      status: 'pending',
      joinDate: new Date('2025-02-23'),
      avatar: 'Images/advisor.jpg',
      selected: false
    },
    {
      id: 3,
      name: 'سعيد أحمد',
      email: 'sa123ah@gmail.com',
      status: 'active',
      joinDate: new Date('2025-02-23'),
      avatar: 'Images/advisor.jpg',
      selected: false
    },
    {
      id: 4,
      name: 'سعيد أحمد',
      email: 'sa123ah@gmail.com',
      status: 'active',
      joinDate: new Date('2025-02-23'),
      avatar: 'Images/advisor.jpg',
      selected: false
    },
    {
      id: 5,
      name: 'سعيد أحمد',
      email: 'sa123ah@gmail.com',
      status: 'active',
      joinDate: new Date('2025-02-23'),
      avatar: 'Images/advisor.jpg',
      selected: false
    },
    {
      id: 6,
      name: 'سعيد أحمد',
      email: 'sa123ah@gmail.com',
      status: 'pending',
      joinDate: new Date('2025-02-23'),
      avatar: 'Images/advisor.jpg',
      selected: false
    },
    {
      id: 7,
      name: 'سعيد أحمد',
      email: 'sa123ah@gmail.com',
      status: 'active',
      joinDate: new Date('2025-02-23'),
      avatar: 'Images/advisor.jpg',
      selected: false
    },
    {
      id: 8,
      name: 'سعيد أحمد',
      email: 'sa123ah@gmail.com',
      status: 'active',
      joinDate: new Date('2025-02-23'),
      avatar: 'Images/advisor.jpg',
      selected: false
    },
    {
      id: 9,
      name: 'سعيد أحمد',
      email: 'sa123ah@gmail.com',
      status: 'active',
      joinDate: new Date('2025-02-23'),
      avatar: 'Images/advisor.jpg',
      selected: false
    },
    {
      id: 10,
      name: 'سعيد أحمد',
      email: 'sa123ah@gmail.com',
      status: 'active',
      joinDate: new Date('2025-02-23'),
      avatar: 'Images/advisor.jpgg',
      selected: false
    },
    // Add more sample data for pagination testing
    {
      id: 11,
      name: 'محمد علي',
      email: 'mohamed.ali@gmail.com',
      status: 'inactive',
      joinDate: new Date('2025-01-15'),
      avatar: 'Images/advisor.jpgg',
      selected: false
    },
    {
      id: 12,
      name: 'فاطمة الزهراء',
      email: 'fatima.zahra@gmail.com',
      status: 'active',
      joinDate: new Date('2025-01-20'),
      avatar: 'Images/advisor.jpgg',
      selected: false
    },
    {
      id: 13,
      name: 'أحمد محمود',
      email: 'ahmed.mahmoud@gmail.com',
      status: 'pending',
      joinDate: new Date('2025-02-01'),
      avatar: 'Images/advisor.jpgg',
      selected: false
    },
    {
      id: 14,
      name: 'نور الهدى',
      email: 'nour.huda@gmail.com',
      status: 'active',
      joinDate: new Date('2025-02-10'),
      avatar: 'Images/advisor.jpgg',
      selected: false
    },
    {
      id: 15,
      name: 'خالد السعيد',
      email: 'khaled.said@gmail.com',
      status: 'inactive',
      joinDate: new Date('2025-01-25'),
      avatar: 'Images/advisor.jpgg',
      selected: false
    }
  ];

}
