import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './server/server.component';
import { NewServerComponent } from './new-server/new-server.component';
import { ServerService } from './server/server.service';

@NgModule({
  declarations: [
    AppComponent,
    ServersComponent,
    ServerComponent,
    NewServerComponent,
  ],
  imports: [BrowserModule],
  providers: [ServerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
