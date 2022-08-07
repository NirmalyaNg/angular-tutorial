import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BasicHighlightDirective } from './basic-highlight.directive';
import { ColorChangeDirective } from './color-change.directive';
import { ProperHighlightDirective } from './proper-highlight.directive';
import { FontColorChangeDirective } from './font-color-change.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    ProperHighlightDirective,
    ColorChangeDirective,
    FontColorChangeDirective,
  ], // Components, Directives, Pipes
  imports: [BrowserModule], // Built-in Modules, Custom Modules
  providers: [], // Services
  bootstrap: [AppComponent], // Only AppComponent
})
export class AppModule {}
