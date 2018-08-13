import { Directive, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollToId]'
})
export class ScrollToIdDirective implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('scroll-to-target-on-event') configs: Array<{ target: Element, event: string }>;
  constructor(private _element: ElementRef) { }
  ngOnInit() {

    for (let config of this.configs) {
      this._element.nativeElement.addEventListener(config.event, () => {
        var targetYPos = config.target.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        // tslint:disable-next-line:max-line-length
        if (targetYPos > (document.documentElement.scrollTop || document.body.scrollTop) + (document.documentElement.clientHeight || window.innerHeight)) {
          window.scrollTo(0, config.target.getBoundingClientRect().top - document.body.getBoundingClientRect().top);
        }
      });
    }
  }
}
