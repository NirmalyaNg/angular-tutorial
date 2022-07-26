import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  parentDummyData: string = 'This is for parent component';
  title = 'angular-introduction';
}
