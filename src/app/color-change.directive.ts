import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appColorChange]',
})
export class ColorChangeDirective {
  @HostBinding('style.color') fontColor: string;
  @HostBinding('style.backgroundColor') backgroundColor: string;

  @Input() mouseEnterColor: string;
  @Input() mouseLeaveColor: string;
  @Input('appColorChange') backgroundHighlightColor: string;

  constructor() {}

  @HostListener('mouseenter') onMouseEnter() {
    // this.fontColor = 'violet';
    this.fontColor = this.mouseEnterColor;
    this.backgroundColor = this.backgroundHighlightColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.fontColor = 'green';
    this.fontColor = this.mouseLeaveColor;
  }
}
