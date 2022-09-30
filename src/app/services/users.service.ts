import { Injectable } from '@angular/core';
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

  public getUsers() {
    return this.users.slice();
  }

  public getUserById(id: string) {
    return this.users.find((user) => {
      return user.id === id;
    });
  }
}
