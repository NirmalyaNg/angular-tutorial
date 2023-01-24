import {
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  @ContentChild('paragraph', { static: true }) paragraph: ElementRef;
  @ViewChild('childHeading', { static: true }) heading: ElementRef;
  constructor() {}

  ngOnInit(): void {
    console.log(this.paragraph.nativeElement);
    console.log('Inside ngOnInit: ', this.heading.nativeElement);
  }

  // Called after the view(html) is initialized
  ngAfterViewInit() {
    console.log('Inside ngAfterViewInit: ', this.heading.nativeElement);
  }

  // Called after the content projected from parent component is initialized
  ngAfterContentInit(): void {
    console.log(this.paragraph.nativeElement);
  }
}
