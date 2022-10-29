import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-async-promise',
  templateUrl: './async-promise.component.html',
  styleUrls: ['./async-promise.component.css'],
})
export class AsyncPromiseComponent implements OnInit {
  title = '';
  constructor() {}

  ngOnInit(): void {
    // this.title = this.getTitle();
    const promise = this.getTitleAsync();
    promise
      .then((value) => {
        // This callback function will be invoked only when the promise is resolved
        this.title = value;
      })
      .catch();
  }

  getTitle(): string {
    return 'Async Promise Component';
  }

  getTitleAsync(): Promise<string> {
    // Promise will be created and returned instantly but the promise will be resolved after 2 seconds
    const promise = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve('Async Promise Component');
      }, 2000);
    });
    return promise;
  }
}
