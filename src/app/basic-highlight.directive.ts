import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]',
})
export class BasicHighlightDirective implements OnInit {
  constructor(private element: ElementRef) {
    console.log(this.element);
  }

  ngOnInit(): void {
    this.element.nativeElement.style['background-color'] = 'green';
    // this.element.nativeElement.style.backgroundColor = 'green';
    this.element.nativeElement.style.color = 'red';
    this.element.nativeElement.style.border = '5px solid violet';
  }
}
