import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  dummyData1: string = 'This is some dummy data 1';
  dummyData2: string = 'This is some dummy data 2';

  constructor() {}

  ngOnInit(): void {}

  changeDummyData1() {
    this.dummyData1 = 'Changed Dummy Data1';
  }

  changeDummyData2() {
    this.dummyData2 = 'Changed Dummy Data2';
  }
}
