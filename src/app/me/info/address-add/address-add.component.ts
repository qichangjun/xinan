import { Component, OnInit } from '@angular/core';
import { MeService } from '../../me.service'
import { Router,ActivatedRoute } from '@angular/router';
import { httpHanldeService } from '../../../shared/httpHandle.service'
@Component({
    selector: 'app-address-add',
    templateUrl: './address-add.component.html',
    styleUrls: ['./address-add.component.scss']
})
export class AddressAddComponent implements OnInit {
    id : string = undefined;
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
        public _ActivatedRoute : ActivatedRoute,
        private _MeService : MeService
    ) {
        this._ActivatedRoute.params.subscribe(async params=>{
            if(params.id){
                this.id = params.id
                let res = await this._MeService.getAddressList()
                let row = res.find(c=>c.id == this.id)
                this.new.province = row.province
                this.new.district = row.district
                this.new.city = row.city
                this.new.address = row.address
                this.new.phone = row.phone
                this.new.name = row.name
                this.new.default = row.default
                console.log(this.new)
            }
        })
     }

    ngOnInit() {
    }

    async addAddress(){
        try{
            var res = await this._MeService.addAddress(this.new,this.id)
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
