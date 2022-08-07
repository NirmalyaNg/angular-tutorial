import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorChange]',
})
export class ColorChangeDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  // Listening to the events of the host(the element on which the directive sits on)
  @HostListener('mouseenter') handleMouseEnter() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'tomato'
    );
  }

  @HostListener('mouseleave') handleMouseLeave() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'green'
    );
  }
}
