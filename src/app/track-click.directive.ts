import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[appTrackClick]'
})
export class TrackClickDirective {
  private element: HTMLInputElement;
  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
    fromEvent(this.element, "click").subscribe(event => this.track(event));
   }
   track(event: Event):void {
    const elemTags = this.element.attributes.getNamedItem("data-track-tags").value.split(" ");
    console.log(`|||||||||| track event: ${elemTags}`)
   }

}
