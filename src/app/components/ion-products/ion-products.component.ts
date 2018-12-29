import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { apiUrlService} from '../../shared/apiUrl.service'
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
        public _apiUrlService : apiUrlService
    ) {
    }

    goDetails(id) {
        this.router.navigate(['/details/' + id]);
    }

}
