import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
    selector: 'app-invite',
    templateUrl: './invite.component.html',
    styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

    constructor(
        public alertController: AlertController,
    ) {
    }

    ngOnInit() {
    }
}
