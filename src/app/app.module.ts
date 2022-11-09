import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HttpTutorialComponent } from './components/http-tutorial/http-tutorial.component';
import { FormsModule } from '@angular/forms';
import { SubjectTutorialComponent } from './components/subject-tutorial/subject-tutorial.component';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';
import { GrandChildComponent } from './components/grand-child/grand-child.component';

@NgModule({
  declarations: [AppComponent, HttpTutorialComponent, SubjectTutorialComponent, ParentComponent, ChildComponent, GrandChildComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
