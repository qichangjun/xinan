import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-address-add',
    templateUrl: './address-add.component.html',
    styleUrls: ['./address-add.component.scss']
})
export class AddressAddComponent implements OnInit {

    new = {
        receiver: '',
        phone: '',
        area: '',
        address: '',
        default: false
    };

    constructor() { }

    ngOnInit() {
    }

}
