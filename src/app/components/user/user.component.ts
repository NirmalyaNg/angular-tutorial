import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public user: User = null;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   this.user = this.usersService.getUserById(params.id);
    // });

    // route.params --> For accessing all the params in the currently loaded route
    // route.queryParams --> For accessing all the queryParams in the currently loaded route
    // route.data --> For accessing all the data returned by all resolvers fot the currently loaded route

    this.route.data.subscribe((data) => {
      this.user = data.userData;
    });
  }
}
