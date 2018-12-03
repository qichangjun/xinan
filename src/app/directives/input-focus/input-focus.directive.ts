import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appInputFocus]'
})
export class InputFocusDirective {

    @Input('appInputFocus') enable: string;

    constructor(
        private el: ElementRef
    ) { }

    @HostListener('ionFocus', ['$event'])
    onFocus(event) {
        this.borderChange(event, '2px solid #e83030');
    }

    @HostListener('ionBlur', ['$event'])
    onBlur(event) {
        this.borderChange(event, '1px solid #e6e6e6');
    }

    private borderChange(event, color: string) {
        if (this.enable) {
            event.target.parentElement.parentElement.nextElementSibling.style.borderBottom = color;
        }
    }

}
