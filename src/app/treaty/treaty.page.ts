import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-treaty',
    templateUrl: './treaty.page.html',
    styleUrls: ['./treaty.page.scss'],
})
export class TreatyPage implements OnInit {

    constructor(
        private modalCtrl: ModalController
    ) { }

    ngOnInit() {
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

}
