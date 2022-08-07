import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProperHighlight]',
})
export class ProperHighlightDirective {
  private element: ElementRef;
  private renderer: Renderer2;

  constructor(element: ElementRef, renderer: Renderer2) {
    this.element = element;
    this.renderer = renderer;
  }
  // constructor(private element: ElementRef, private renderer: Renderer2) {
  // }

  ngOnInit(): void {
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      'tomato'
    );
  }
}
