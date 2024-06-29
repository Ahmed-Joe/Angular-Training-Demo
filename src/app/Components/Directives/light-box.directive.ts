import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[LightBox]',
})
export class LightBoxDirective implements OnChanges {
  @Input('LightBox') highLightColor: string = 'yellow';
  @Input() defaultColor: string = 'darkblue';
  constructor(private elemRef: ElementRef) {
    // this.elemRef.nativeElement.style.border = `5px solid ${this.defaultColor}`;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.elemRef.nativeElement.style.border = `5px solid ${this.defaultColor}`;
  }
  @HostListener('mouseover') onMouseOver() {
    this.elemRef.nativeElement.style.border = `5px solid ${this.highLightColor}`;
  }
  @HostListener('mouseout') onMouseOut() {
    this.elemRef.nativeElement.style.border = `5px solid ${this.defaultColor}`;
  }
}
