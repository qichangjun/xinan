import { Component, Input } from '@angular/core';

@Component({
    selector: 'back-header',
    template: `
    <ion-toolbar>
        <ion-buttons slot="start">
            <ion-button class="back-btn" fill="clear" color="dark" (click)="back()">
                <ion-icon name="arrow-back"></ion-icon> {{hTitle}}
            </ion-button>
        </ion-buttons>
    </ion-toolbar>
  `,
    styles: [`
    .back-btn {
      font-weight: bold;
    }
  `]
})
export class BackHeaderComponent {
    @Input() hTitle: string;

    back() {
        window.history.back();
    }

}
