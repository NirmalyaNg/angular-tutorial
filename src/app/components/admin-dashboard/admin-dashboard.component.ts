import { Component, OnInit } from '@angular/core';
import { AdminActions } from 'src/app/services/admin-actions.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  usersCount: number = 0;
  ordersCount: number = 0;
  income: number = 0;
  constructor(private admin: AdminActions) {}

  ngOnInit(): void {
    this.admin.getDashBoardData().subscribe({
      next: (data: any) => {
        this.usersCount = data.users;
        this.ordersCount = data.orders;
        this.income = Math.round(data.income);
      },
    });
  }
}
