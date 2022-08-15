import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorChangeDirective } from './color-change.directive';
import { CustomNgIfDirective } from './custom-ng-if.directive';

@NgModule({
  declarations: [AppComponent, ColorChangeDirective, CustomNgIfDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
