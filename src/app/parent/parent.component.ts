import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent
  implements OnInit, AfterViewInit, AfterContentInit
{
  // @ViewChild('heading', { static: true }) myHeading: ElementRef;
  // @ContentChild('myParagraph', { static: true }) myParagraph: ElementRef;
  @ViewChild('heading') myHeading: ElementRef;
  @ContentChild('myParagraph') myParagraph: ElementRef;
  showChild: boolean = true;

  constructor() {}

  ngOnInit(): void {
    console.log('Inside ngOnInit: ', this.myHeading);
    console.log('Inside ngOnInit: ', this.myParagraph);
  }

  ngAfterViewInit(): void {
    console.log('Inside ngAfterViewInit', this.myHeading);
  }

  ngAfterContentInit(): void {
    console.log('Inside ngAfterContentInit', this.myParagraph);
  }

  handleRemoveChild() {
    this.showChild = false;
  }
}
