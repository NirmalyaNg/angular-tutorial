import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { PostsComponent } from './components/posts/posts.component';
import { HeaderComponent } from './components/header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { UsersService } from './services/users.service';
import { UserComponent } from './components/user/user.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';

// 'users-list',
// 'users-list/:userId',
// 'users-list/add',
// 'users-list/:userId/edit'

const routes: Routes = [
  {
    path: '',
    // component: HomeComponent,
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users-list',
    component: UsersListComponent,
    children: [
      {
        path: 'add',
        component: UserAddComponent,
      },
      {
        path: ':userId',
        component: UserComponent,
      },

      {
        path: ':userId/edit',
        component: UserEditComponent,
      },
    ],
  },
  // {
  //   path: 'users-list/:userId',
  //   component: UserComponent
  // }
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: '**',
    component: ErrorNotFoundComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersListComponent,
    PostsComponent,
    HeaderComponent,
    UserComponent,
    UserAddComponent,
    UserEditComponent,
    ErrorNotFoundComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
