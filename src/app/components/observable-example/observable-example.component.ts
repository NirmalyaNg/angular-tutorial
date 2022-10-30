import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-observable-example',
  templateUrl: './observable-example.component.html',
  styleUrls: ['./observable-example.component.css'],
})
export class ObservableExampleComponent implements OnInit, OnDestroy {
  intervalObs: Observable<any>;
  intervalSubscription: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.intervalObs = interval(1000);

    this.intervalObs = this.intervalObs.pipe(
      // filter((data: number) => {
      //   return data % 2 === 0;
      // }),
      map((data: number) => {
        return 'Value: ' + data;
      })
    );

    this.intervalSubscription = this.intervalObs.subscribe((data: string) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
