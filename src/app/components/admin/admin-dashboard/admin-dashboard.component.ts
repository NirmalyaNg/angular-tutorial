import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  usersCount: number = 0;
  ordersCount: number = 0;
  income: number = 0;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.usersCount = data.dashboard.users;
      this.ordersCount = data.dashboard.orders;
      this.income = Math.round(data.dashboard.income);
    });
  }
}
