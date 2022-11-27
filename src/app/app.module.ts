import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomFilterPipe } from './components/custom-pipe/custom-filter.pipe';
import { CustomFilterPipe2 } from './components/custom-pipe/custom-filter2.pipe';
import { CustomPipeComponent } from './components/custom-pipe/custom-pipe.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomPipeComponent,
    CustomFilterPipe,
    CustomFilterPipe2,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
