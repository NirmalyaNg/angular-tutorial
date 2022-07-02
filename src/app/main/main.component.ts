import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  title: string = 'Main Component';
  creatorName: string = 'Nirmalya';
  myNumber: number = 10;
  result: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  getStringInterpolationValue() {
    return 'This is returned from a method';
  }
}
