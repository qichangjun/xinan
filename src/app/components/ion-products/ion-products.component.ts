import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'ion-products',
    templateUrl: './ion-products.component.html',
    styleUrls: ['./ion-products.component.scss']
})
export class IonProductsComponent {

    @Input() products: Array<any>;

    constructor(
        public navCtrl: NavController,
        private router: Router,
    ) {
    }

    goDetails(id) {
        this.router.navigate(['/details/' + id]);
    }

}
