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
    console.log('ngOninit running');
    const id = this.route.snapshot.params['userId'];
    this.user = this.usersService.getUserById(id);

    this.route.params.subscribe((p) => {
      console.log(p);
      console.log('Inside subscription');
      const id = p['userId'];
      this.user = this.usersService.getUserById(id);
    });
  }

  handleClick() {
    this.router.navigate(['users-list', 'u3']);
  }
}
