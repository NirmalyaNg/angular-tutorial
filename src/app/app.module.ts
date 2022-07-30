import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewServerComponent } from './new-server/new-server.component';
import { ServerComponent } from './server/server.component';

@NgModule({
  declarations: [AppComponent, NewServerComponent, ServerComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
