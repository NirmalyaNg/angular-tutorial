import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular introduction';

  promiseValue: Promise<string>;
  observableValue: Observable<string>;
  dateValue = new Date(2022, 10, 27);
  objValue = {
    name: 'Nirmalya',
    age: 23,
    salary: 10000,
  };
  arrayValue = ['Sampriti', 'Tuni', 'Minu'];

  ngOnInit(): void {
    this.promiseValue = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve('Hello World');
      }, 2000);
    });
    this.observableValue = new Observable((observer) => {
      setTimeout(() => {
        observer.next('Hiii There !!');
      }, 4000);
    });
  }
}
