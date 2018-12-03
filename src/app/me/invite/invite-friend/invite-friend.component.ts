// import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, PopoverController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { sendValidationCode, verificationCodeLogin, login } from '../../../shared/graphql-tag';

import { InviteService } from '../invite.service';
import { forEach, any } from 'async';
import { HttpClient } from '@angular/common/http';
import { valueFromNode } from 'apollo-utilities';
@Component({
    selector: 'app-invite-friend',
    templateUrl: './invite-friend.component.html',
    styleUrls: ['./invite-friend.component.scss'],
    // providers: [InviteService]
})
export class InviteFriendComponent implements OnInit {
    phone = '';
    name = '';
    vertify_code = {
        ok: false,
        phone: '',
        code: '',
        status: true,	// 获取验证码按钮的启用禁用状态
        time: 59,
        info: '短信验证码'
    };

    timer = null; // 获取验证码定时器
    options: Array<any> = [];
    // selected: Array<any> = [];
    pro;
    ci = {
        id: '', title: ''

    };
    province = [
        {
            'title': '北京市',
            'id': '110000',
            'children': [{
                'title': '北京市',
                'id': '110000'
            }]
        },
    ];
    city = [
    ];
    area;
    classifyId = 10;
    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private popoverCtrl: PopoverController,
        private toastCtrl: ToastController,
        private apollo: Apollo,
        private alertController: AlertController,
        private loadingCtrl: LoadingController,
        private router: Router,
        private http: HttpClient,
        // private http: HTTP
        // private reviceServe: InviteService
    ) { }

    ngOnInit() {
        // this.http.get('../../../../assets/json/city.json').subscribe(res => {
        //     // this.options = this.options.concat(res);
        //     this.options = this.options.concat(res);
        //     // console.log(res);
        //     console.log(this.options);
        // });
        // console.log(this.options);
    }
    changeProvince() {
        console.log(this.options);
        this.http.get('../../../../assets/json/city.json').subscribe(res => {
            // this.options = this.options.concat(res);
            this.province = this.options.concat(res);
        });
        console.log(this.pro);
        const item = this.province.forEach((val: any) => {
            if (val.id === this.pro) {
                this.city = val.children;
                this.ci = {
                    id: this.city[0].id,
                    title: this.city[0].title
                };
                console.log(this.city);
                console.log(this.ci);
            }
            // console.log(this.city);
        });
    }
    changeCity() {
        console.log(this.ci);

    }
    onModelChange(e) {
        this.classifyId = e[e.length - 1];
    }

    async presentLoading(msg: string) {
        const loading = await this.loadingCtrl.create({
            message: msg,
            duration: 2000,
            showBackdrop: true  // 是否显示遮罩层
        });
        return await loading.present();
    }

    async showToast(msg: string, pos: any = 'bottom') {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: pos,
            cssClass: 'auth-toast',
            translucent: true
        });
        toast.present();
    }

    async showErrorToast(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'middle',
            cssClass: 'auth-error-toast',
            translucent: true
        });
        toast.present();
    }

    check(name: string, errors: any) {
        if (errors === null) {
            return true;
        } else {
            if (name === 'required' && 'required' in errors) {// required
                return false;
            } else if (name === 'minlength' && 'minlength' in errors) { // minlength
                return false;
            } else if (name === 'maxlength' && 'maxlength' in errors) { // maxlength
                return false;
            } else if (name === 'pattern' && 'pattern' in errors) { // pattern
                return false;
            } else {
                return true;
            }
        }
    }
    // 验证码登录时验证用户输入是否有误
    checkCode(errors) {
        if (!this.check('required', errors[0])) {
            this.showErrorToast('手机号码不能为空');
            this.vertify_code.ok = false;
        } else if (!this.check('pattern', errors[0])) {
            this.showErrorToast('手机号码格式不正确');
            this.vertify_code.ok = false;
        } else if (!this.check('required', errors[1])) {
            this.showErrorToast('验证码不能为空');
            this.vertify_code.ok = false;
        } else if (!this.check('minlength', errors[1])) {
            this.showErrorToast('验证码为六位验证码');
            this.vertify_code.ok = false;
        } else {
            this.vertify_code.ok = true;
        }
    }

    // 获取验证码
    getCode(valid) {
        const btnStatus = valid && this.vertify_code.status;
        if (btnStatus && this.timer === null) {
            this.apollo.mutate({
                mutation: sendValidationCode,
                variables: {
                    mobile: this.phone
                }
            }).subscribe((res: any) => {
                console.log(res);
                if (res.data.sendValidationCode) {
                    const send = res.data.sendValidationCode;
                    if (send.code === 200) {
                        this.vertify_code.status = false;
                        this.timer = setInterval(() => {
                            if (this.vertify_code.status === false && this.vertify_code.time > 0) {
                                this.vertify_code.info = '短信验证码(' + this.vertify_code.time-- + 's)';
                            } else {
                                this.stop_timer(0);
                            }

                        }, 1000);
                        this.showToast('验证码已经发送，注意查看');
                    } else {
                        this.showErrorToast(send.message);
                    }
                }
            });

        } else if (!valid) {
            this.showErrorToast('手机号码为空或格式错误');
            if (this.timer !== null) { this.stop_timer(1); }
        }
    }


    toSignInCode(formValue, errors) {

    }
    // 点击验证码登录按钮
    // toSignInCode(formValue, errors) {
    //     console.log(formValue);
    //     // 检查用户输入是否有误
    //     this.checkCode(errors);

    //     if (this.vertify_code.ok) {
    //         this.apollo.watchQuery<any>({
    //             query: verificationCodeLogin,
    //             variables: {
    //                 mobile: formValue.phone,
    //                 validationCode: formValue.code
    //                 // name: formValue.name,
    //             }
    //         }).valueChanges.subscribe((val) => {
    //             console.log(val);
    //             if (val && val.data && val.data.verificationCodeLogin) {
    //                 const send = val.data.verificationCodeLogin;
    //                 if (send.code === 200 && send.data && send.data.token) {
    //                     localStorage.setItem('token', send.data.token.accessToken);
    //                     if (send.data.newUser) {
    //                         this.showToast(send.message);
    //                     } else {
    //                         this.showToast(send.message);
    //                     }
    //                 } else {
    //                     this.showErrorToast(send.message);
    //                 }
    //             }
    //         });
    //     }
    // }
    // 关闭定时器
    stop_timer(type) {
        if (this.timer) {
            // 0 超时重新获取
            // 1 初始化 获取验证码
            this.vertify_code.info = type === 0 ? '重新获取' : (type === 1 ? '短信验证码' : '短信验证码');
            this.vertify_code.time = 59;
            this.vertify_code.status = true;

            clearInterval(this.timer);
            this.timer = null;
        }
    }

    async alertMessage(header, message, buttons) {
        const alert = await this.alertController.create({
            header,
            message,
            buttons
        });

        await alert.present();
    }

    alert() {
        this.alertMessage('提示', '感谢您的支持，您尚未获得此功能的使用权限，请耐心等待平台开放', [
            {
                text: '好的',
                role: 'cancel',
                cssClass: 'secondary'
            }]);
    }



    //// 地址联动
    // ionViewDidLoad() {
    //     this.getRequestContact();
    // }

    // getRequestContact() {
    //     this.reviceServe.getRequestContact().subscribe(res => {
    //         this.listData = res.json();
    //     }, error => {
    //         console.log(error);
    //     });
    // }
}
