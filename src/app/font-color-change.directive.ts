import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFontColorChange]',
})
export class FontColorChangeDirective {
  // Binds to the property of the host(element on which the directive sits on)
  @HostBinding('style.color') fontColor: string;

  constructor(private element: ElementRef) {
    console.log(this.element.nativeElement);
  }

  ngOnInit(): void {
    this.fontColor = 'blue';
  }
}
