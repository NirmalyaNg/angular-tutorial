import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
  }

  handleClick() {
    // this.router.navigate(['home'], { relativeTo: this.route });
    this.router.navigate(['home']);
  }

  handleUserNavigation(id: string) {
    this.router.navigate(['users-list', id]);
    // http://localhost:4200/users-list/u4
  }
}
