import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 'u1',
      name: 'User 1',
      age: 22,
    },
    {
      id: 'u2',
      name: 'User 2',
      age: 24,
    },
    {
      id: 'u3',
      name: 'User 3',
      age: 20,
    },
    {
      id: 'u4',
      name: 'User 4',
      age: 23,
    },
  ];
  public usersChanged = new EventEmitter<User[]>();

  public getUsers() {
    return this.users.slice();
  }

  public getUserById(id: string) {
    return this.users.find((user) => {
      return user.id === id;
    });
  }

  public addUser(username: string, age: string) {
    this.users.push({
      id: Math.random().toString(),
      name: username,
      age: +age,
    });
    this.usersChanged.emit(this.users.slice());
  }

  public editUser(id: string, updatedName: string, updatedAge: string) {
    const userToEdit = this.users.find((user) => {
      return user.id === id;
    });
    userToEdit.name = updatedName;
    userToEdit.age = +updatedAge;
    this.usersChanged.emit(this.users.slice());
  }
}
