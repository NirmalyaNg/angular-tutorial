import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AsyncPromiseComponent } from './components/async-promise/async-promise.component';
import { AsyncObservableComponent } from './components/async-observable/async-observable.component';

@NgModule({
  declarations: [AppComponent, AsyncPromiseComponent, AsyncObservableComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
