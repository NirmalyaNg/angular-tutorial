import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { UserResolver } from './services/user-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users-list',
    component: UsersListComponent,
    children: [
      {
        path: ':id',
        component: UserComponent,
        resolve: {
          userData: UserResolver,
        },
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersListComponent,
    UserComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [UserResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
