import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeColor]',
  standalone: true
})
export class ChangeColorDirective {

  constructor(private Ref: ElementRef) {
    
  }

  @HostListener('mouseover') mouseover(){
   this.Ref.nativeElement.style.backgroundColor = 'blue';
  }

  @HostListener('mouseout') mouseout(){
   this.Ref.nativeElement.style.backgroundColor = 'white';
  }

}
