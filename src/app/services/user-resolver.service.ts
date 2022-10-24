import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private usersService: UsersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User | Promise<User> | Observable<User> {
    const userId = route.params.id;
    return this.usersService.getUserByIdAsync(userId);
    // return this.usersService.getUserById(userId);
  }
}
