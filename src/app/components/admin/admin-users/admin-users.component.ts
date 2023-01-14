import { Component, OnInit } from '@angular/core';
import { User, UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  constructor(private user: UsersService) {}

  ngOnInit(): void {
    this.user.fetchUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onChangeIsAdmin(id: string, status: boolean) {
    this.user.editIsAdmin(id, status).subscribe({
      next: () => {
        this.users.find((user) => user._id === id).isAdmin = status;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
