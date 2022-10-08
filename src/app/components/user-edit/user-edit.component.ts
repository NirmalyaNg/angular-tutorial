import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  @ViewChild('myForm') editUserForm: NgForm;

  loadedUserId: string = null;
  loadedUsername: string = null;
  loadedAge: number = null;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['userId'];
    const user = this.usersService.getUserById(id);
    this.loadedUserId = id;
    this.loadedUsername = user.name;
    this.loadedAge = user.age;
  }

  handleSubmit() {
    const username = this.editUserForm.value.username;
    const age = this.editUserForm.value.age;

    this.usersService.editUser(this.loadedUserId, username, age);
    this.router.navigate(['/users-list']);
  }
}
