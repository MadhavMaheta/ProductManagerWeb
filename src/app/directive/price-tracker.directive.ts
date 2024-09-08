import { Directive, ElementRef, HostListener, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPriceTracker]'
})
export class PriceTrackerDirective{

  constructor(private el : ElementRef) { 
  }

  @HostListener('change', ['$event.target.value'])
  ngOnChanges(changes: SimpleChanges): void {
    
    const element = this.el.nativeElement as HTMLInputElement;
    alert(this.el.nativeElement.value);

    if(parseInt(this.el.nativeElement.value) < 100000)
    {
      element.style.borderColor = "yellow";
    }
    else if(parseInt(this.el.nativeElement.value) >  10000 && parseInt(this.el.nativeElement.value) < 100000)
    {
      element.style.borderBlockColor = "green";
    }
    else if(parseInt(this.el.nativeElement.value) > 100000)
    {
      element.style.borderBlockColor = "red";
    }
  }
}
