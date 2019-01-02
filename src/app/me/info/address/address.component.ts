import { Component, OnInit } from '@angular/core';
import { MeService } from '../../me.service';
import { AlertController } from '@ionic/angular';
import { httpHanldeService } from '../../../shared/httpHandle.service'
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  isShow = true; // 是否有收货地址
  addressList : Array<any> = [];
  contact_id : any = undefined
  constructor(
    private _httpHanldeService : httpHanldeService,
    public alertController: AlertController,
    private _meService : MeService
  ) { }

  ngOnInit() {
    this.contact_id = JSON.parse(window.localStorage.getItem('userInfo')).contact_id
    this.getAddressList()
  }

  async getAddressList(){
    this.addressList = await this._meService.getAddressList()
    
  }

  deleteAddress(id){
    let deleteFn = async ()=>{
      await this._meService.deleteAddress(id) 
      this._httpHanldeService.showToast('删除成功')
      this.getAddressList()
    }
    this.presentAlertConfirm(deleteFn)
  }

  async setAsDefault(id){
    await this._meService.setAsDefault(id)
    this._httpHanldeService.showToast('设置成功')
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    userInfo.contact_id = id 
    this.contact_id = id 
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    this.getAddressList()
  }

  async presentAlertConfirm(deleteFn) {
    const alert = await this.alertController.create({
      header: '删除地址!',
      message: '确认要删除该地址吗',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            deleteFn()
          }
        }
      ]
    });

    await alert.present();
  }
}
