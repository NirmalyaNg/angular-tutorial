import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
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
  constructor() {}

  getUsers() {
    return this.users.slice();
  }

  getUserById(userId: string) {
    return this.users.find((user) => userId === user.id);
  }

  getUserByIdAsync(userId: string): Promise<User> {
    const promise = new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users.find((user) => userId === user.id));
      }, 2000);
    });
    return promise;
  }
}
