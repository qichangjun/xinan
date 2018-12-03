import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { sendValidationCode, verifyMobile, verifyPassword, bindMobile } from '../../../shared/graphql-tag';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-phone-change',
    templateUrl: './phone-change.component.html',
    styleUrls: ['./phone-change.component.scss']
})
export class PhoneChangeComponent implements OnInit {
    step = 1; // 1: 验证手机号 2.验证密码 3.绑定新手机

    old = {
        phone: '',
        phonehiding: '',
        code: ''
    };

    vertify = {
        status: true,
        time: 59,
        info: '短信验证码'
    };
    timer = null; // 获取验证码定时器

    pass = {
        password: ''
    };

    new = {
        phone: '',
        code: ''
    };

    ok = false;

    constructor(
        private router: Router,
        private activedRoute: ActivatedRoute,
        private apollo: Apollo,
        private toastCtrl: ToastController
    ) {
        this.activedRoute.params.subscribe(
            (params) => {
                this.old.phone = params.oldphone;
                this.old.phonehiding = this.phoneSeparated(this.old.phone);
            }
        );
    }

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
            duration: 2000,
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
            this.ok = false;
        } else if (!this.check('pattern', errors[0])) {
            this.showErrorToast('手机号码格式不正确');
            this.ok = false;
        } else if (!this.check('required', errors[1])) {
            this.showErrorToast('验证码不能为空');
            this.ok = false;
        } else if (!this.check('minlength', errors[1])) {
            this.showErrorToast('验证码为六位验证码');
            this.ok = false;
        } else {
            this.ok = true;
        }
    }

    // 获取验证码
    getCode(phone, valid) {
        const btnStatus = valid && this.vertify.status;
        if (btnStatus && this.timer === null) {
            this.apollo.mutate({
                mutation: sendValidationCode,
                variables: {
                    mobile: phone
                }
            }).subscribe((res: any) => {
                console.log(res);
                if (res.data.sendValidationCode) {
                    const send = res.data.sendValidationCode;
                    if (send.code === 200) {
                        this.vertify.status = false;
                        this.timer = setInterval(() => {
                            if (this.vertify.status === false && this.vertify.time > 0) {
                                this.vertify.info = '短信验证码(' + this.vertify.time-- + 's)';
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
            this.vertify.info = type === 0 ? '重新获取' : (type === 1 ? '短信验证码' : '短信验证码');
            this.vertify.time = 59;
            this.vertify.status = true;

            clearInterval(this.timer);
            this.timer = null;
        }
    }

    // step1: 验证旧手机 更换手机号绑定
    step1(formValue, errors) {
        console.log(formValue);
        // 检查用户输入是否有误
        this.checkCode(errors);
        if (this.ok) {
            this.apollo.watchQuery<any>({
                query: verifyMobile,
                variables: {
                    mobile: formValue.phone,
                    validationCode: formValue.code
                }
            }).valueChanges.subscribe((val) => {
                console.log(val);
                if (val && val.data && val.data.verifyMobile) {
                    const send = val.data.verifyMobile;
                    if (send.code === 200 && send.message) {
                        this.clear();
                        this.step = 3; // 手机验证成功 去绑定新手机
                        this.showToast(send.message);
                    } else {
                        this.showErrorToast(send.message);
                    }
                }
            });
        }
    }
    // step2: 使用密码 更换手机号绑定
    step2(formValue) {
        this.apollo.watchQuery<any>({
            query: verifyPassword,
            variables: {
                password: formValue.password
            }
        }).valueChanges.subscribe((val) => {
            console.log(val);
            if (val && val.data && val.data.verifyPassword) {
                const send = val.data.verifyPassword;
                if (send.code === 200 && send.message) {
                    this.clear();
                    this.step = 3; // 密码验证成功 去绑定新手机
                    this.showToast(send.message);
                } else {
                    this.showErrorToast(send.message);
                }
            }
        });
    }
    // step3: 绑定新手机
    step3(formValue, errors) {
        console.log(formValue);
        // 检查用户输入是否有误
        this.checkCode(errors);
        if (this.ok) {
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
                        this.back();
                        this.showToast('手机更换绑定成功，请重新登录');
                    } else {
                        this.showErrorToast(send.message);
                    }
                }
            });
        }
    }

    // 重置数据
    clear() {
        this.old.code = '';

        this.vertify = {
            status: true,
            time: 59,
            info: '短信验证码'
        };
        this.timer = null; // 获取验证码定时器
        this.stop_timer(1);

        this.pass = {
            password: ''
        };

        this.new = {
            phone: '',
            code: ''
        };

        this.ok = false;
    }

    back() {
        this.clear();
        // 退出登录
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        this.router.navigate(['/']);
    }

    // 手机号码格式转化为 344 格式 （188 3886 9199）
    private phoneSeparated(phoneNumber) {
        let tel = this.trim(phoneNumber, 'g');
        if (/^[1][3,4,5,7,8][0-9]{9}$/.test(tel)) {
            tel = tel.substring(0, 3) + ' **** ' + tel.substring(7, 11);
        }
        return tel;
    }

    // 去掉字符串中所有空格(包括中间空格,需要设置第2个参数为:g)
    private trim(str, is_global) {
        let result = str.replace(/(^\s+)|(\s+$)/g, '');
        if (is_global && is_global.toLowerCase() === 'g') {
            result = result.replace(/\s/g, '');
        }
        return result;
    }

}
