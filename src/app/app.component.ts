import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title: string = 'angular-introduction';
  public showTitle: boolean = true;
  public titleColor: string = 'green';
  public isParagrapahModified: boolean = true;
  public products = [
    {
      id: 'p1',
      name: 'Samsung Phone',
      description: 'This is a Samsung Phone',
    },
    {
      id: 'p2',
      name: 'Micromax Phone',
      description: 'This is a Micromax Phone',
    },
    {
      id: 'p3',
      name: 'Apple IPhone',
      description: 'This is an Apple IPhone',
    },
    {
      id: 'p4',
      name: 'OnePlus Phone',
      description: 'This is a OnePlus Phone',
    },
  ];

  public showTitleHandler() {
    console.log('Show Title Button Clicked');
    this.showTitle = true;
  }

  public hideTitleHandler() {
    console.log('Hide Title Button Clicked');
    this.showTitle = false;
  }

  public toggleParagraphClass() {
    this.isParagrapahModified = !this.isParagrapahModified;
  }

  public getColor() {
    return 'violet';
  }
}
