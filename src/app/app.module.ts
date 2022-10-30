import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AsyncPromiseComponent } from './components/async-promise/async-promise.component';
import { AsyncObservableComponent } from './components/async-observable/async-observable.component';
import { ObservableExampleComponent } from './components/observable-example/observable-example.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: ObservableExampleComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AsyncPromiseComponent,
    AsyncObservableComponent,
    ObservableExampleComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
