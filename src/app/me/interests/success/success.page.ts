import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-success',
    templateUrl: './success.page.html',
    styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
    name: string;
    constructor(
        public activeRoute: ActivatedRoute,
        public alertController: AlertController,
    ) { }

    ngOnInit() {
        this.activeRoute.params.subscribe(
            (params) => {
                const cid = params.id / 1;
                console.log(cid);
                if (cid === 1) {
                    this.name = '金额';
                } else {
                    this.name = '救助金额';
                }
            });
    }
}
