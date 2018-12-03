import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { findCurrentUserInfo, bindMobile, sendValidationCode } from '../../shared/graphql-tag';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bind-phone',
    templateUrl: './bind-phone.page.html',
    styleUrls: ['./bind-phone.page.scss'],
})
export class BindPhonePage implements OnInit {

    user = {
        name: '微信用户',
        img: '../assets/imgs/img_avatar_default.png'
    };

    data = {
        ok: false,
        phone: '',
        code: '',
        status: true,	// 获取验证码按钮的启用禁用状态
        time: 59,
        info: '短信验证码'
    };

    timer = null; // 获取验证码定时器

    userInfo: any;

    constructor(
        private toastCtrl: ToastController,
        private apollo: Apollo,
        private router: Router
    ) { }

    ngOnInit() {
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
            duration: 3000,
            position: 'middle',
            cssClass: 'auth-error-toast',
            translucent: true
        });
        toast.present();
    }

    // check
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
            this.data.ok = false;
        } else if (!this.check('pattern', errors[0])) {
            this.showErrorToast('手机号码格式不正确');
            this.data.ok = false;
        } else if (!this.check('required', errors[1])) {
            this.showErrorToast('验证码不能为空');
            this.data.ok = false;
        } else if (!this.check('minlength', errors[1])) {
            this.showErrorToast('验证码至少为四位');
            this.data.ok = false;
        } else {
            this.data.ok = true;
        }
    }

    // 获取验证码
    getCode(valid) {
        const btnStatus = valid && this.data.status;
        if (btnStatus && this.timer === null) {
            this.apollo.mutate({
                mutation: sendValidationCode,
                variables: {
                    mobile: this.data.phone
                }
            }).subscribe((res: any) => {
                console.log(res);
                if (res.data.sendValidationCode) {
                    const send = res.data.sendValidationCode;
                    if (send.code === 200) {
                        this.data.status = false;
                        this.timer = setInterval(() => {
                            if (this.data.status === false && this.data.time > 0) {
                                this.data.info = '短信验证码(' + this.data.time-- + 's)';
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

    // 关闭定时器
    stop_timer(type) {
        if (this.timer) {
            // 0 超时重新获取
            // 1 初始化 获取验证码
            this.data.info = type === 0 ? '重新获取' : (type === 1 ? '短信验证码' : '短信验证码');
            this.data.time = 59;
            this.data.status = true;

            clearInterval(this.timer);
            this.timer = null;
        }
    }

    toBindPhone(formValue, errors) {
        // 检查用户输入是否有误
        this.checkCode(errors);
        if (this.data.ok) {
            this.apollo.mutate({
                mutation: bindMobile,
                variables: {
                    mobile: formValue.phone,
                    validationCode: formValue.code
                }
            }).subscribe((val) => {
                console.log(val);
                if (val && val.data && val.data.bindMobile) {
                    const send = val.data.bindMobile;
                    if (send.code === 200 && send.message) {
                        this.clear();
                        this.router.navigate(['tabs']);
                        this.showToast('注册且登录成功');
                    } else {
                        this.showErrorToast(send.message);
                    }
                }
            });
        }
    }


    clear() {
        this.data = {
            ok: false,
            phone: '',
            code: '',
            status: true,	// 获取验证码按钮的启用禁用状态
            time: 59,
            info: '短信验证码'
        };

        this.timer = null; // 获取验证码定时器

        this.stop_timer(1);
    }
}
