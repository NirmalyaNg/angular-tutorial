import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { PostsComponent } from './components/posts/posts.component';
import { HeaderComponent } from './components/header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { UsersService } from './services/users.service';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users-list',
    component: UsersListComponent,
  },
  {
    path: 'users-list/:id',
    component: UserComponent,
  },
  {
    path: 'posts',
    component: PostsComponent,
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
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
