import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {
  @ViewChild('myForm') addUserForm: NgForm;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  handleSubmit() {
    const username = this.addUserForm.value.username;
    const age = this.addUserForm.value.age;

    this.usersService.addUser(username, age);
    this.addUserForm.reset();
  }
}
