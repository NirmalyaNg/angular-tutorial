import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HttpTutorialComponent } from './components/http-tutorial/http-tutorial.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HttpTutorialComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
