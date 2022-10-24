import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  public users: User[] = [];
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
  }

  handleClick(userId: string) {
    this.router.navigate(['/users-list', userId]);
  }
}
