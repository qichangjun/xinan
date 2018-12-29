import { Component, OnInit } from '@angular/core';
import { MeService } from '../../me.service'
import { Router } from '@angular/router';
import { httpHanldeService } from '../../../shared/httpHandle.service'
@Component({
    selector: 'app-address-add',
    templateUrl: './address-add.component.html',
    styleUrls: ['./address-add.component.scss']
})
export class AddressAddComponent implements OnInit {

    new = {
        province: '',
        district: '',
        city: '',
        address: '',
        phone : '',
        name : '',
        default: false
    };

    constructor(
        private _httpHanldeService : httpHanldeService,
        public router : Router,
        private _MeService : MeService
    ) { }

    ngOnInit() {
    }

    async addAddress(formRef){
        try{
            var res = await this._MeService.addAddress(this.new)
            if (this.new.default){
                await this._MeService.setAsDefault(res)
            }
            this._httpHanldeService.showToast('设置成功')           
            this.router.navigate(['/info/address']);
        }catch(err){
            alert(err)
        }
        
    }

}
