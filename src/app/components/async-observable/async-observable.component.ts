import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-async-observable',
  templateUrl: './async-observable.component.html',
  styleUrls: ['./async-observable.component.css'],
})
export class AsyncObservableComponent implements OnInit {
  myObservable$ = new Observable((observer) => {
    // Here observer is an object which contains methods such as next, error, complete
    // With observable you can send mutiple values, but if you send error the observable will end
    observer.next('Value 11');
    observer.next('Value 12');
    // observer.error('Something went wrong');
    observer.next('Value 13');
    observer.complete();
  });

  myPromise = new Promise((resolve, reject) => {
    // Here resolve and reject are functions
    resolve('Value 1');
    resolve('Value 2'); // This will not be called
  });

  constructor() {}

  ngOnInit(): void {
    this.myPromise
      .then((val) => {
        console.log('Inside .then()');
        console.log(val);
      })
      .catch();

    this.myObservable$.subscribe(
      (data) => {
        console.log('Inside subscribe()');
        console.log(data);
      },
      (error) => {
        console.log('Inside error callback');
        console.log(error);
      },
      () => {
        console.log('The observable is complete');
      }
    );
  }
}
