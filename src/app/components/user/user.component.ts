import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['userId'];
    this.user = this.usersService.getUserById(id);
    // route.snapshot.params is an object which contains the route params and their values
    // as key value pairs

    // On the other hand route.params is an observable which we need to subscribe to and
    // the function that we pass to subscribe method will receive the object which contains
    // the route params and their values as key value pairs
    this.route.params.subscribe((p) => {
      const id = p['userId'];
      this.user = this.usersService.getUserById(id);
    });
  }

  handleClick() {
    this.router.navigate(['users-list', 'u3']);
  }

  handleEditNavigation() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
    });
  }
}
