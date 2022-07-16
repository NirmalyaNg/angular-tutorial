import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('myHeading', { static: true }) headingElement: ElementRef;
  @ViewChild('myInput', { static: true }) inputElement: ElementRef;

  constructor() {}

  ngOnInit(): void {
    console.log(this.headingElement.nativeElement.textContent);
  }

  handleClick() {
    console.log('Input Value: ', this.inputElement.nativeElement.value);
  }
}
