import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { setPassword } from '../../shared/graphql-tag';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
    data = {
        ok: false,
        password1: '',
        password2: ''
    };
    eyeshow1: boolean;
    eyeshow2: boolean;

    constructor(
        private toastCtrl: ToastController,
        private apollo: Apollo,
        private route: Router
    ) { }

    ngOnInit() {
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

    // 检查用户输入是否有误
    checkAll(errors) {
        // 0:新密码
        if (!this.check('required', errors[0])) {
            this.showErrorToast('密码不能为空');
            this.data.ok = false;
        } else if (!this.check('minlength', errors[0]) || !this.check('maxlength', errors[0]) || !this.check('pattern', errors[0])) {
            this.showErrorToast('密码格式应为6～12位数字、英文、或数字英文组合');
            this.data.ok = false;
        } else if (this.data.password1 !== this.data.password2) {
            this.showErrorToast('两次密码输入不一致');
            this.data.ok = false;
        } else {
            this.data.ok = true;
        }
    }

    // 重置密码
    toSetPass(formValue, errors) {
        console.log(formValue);
        // 检查用户输入是否有误
        this.checkAll(errors);

        if (this.data.ok) {

            this.apollo.mutate({
                mutation: setPassword,
                variables: {
                    password: formValue.password1
                }
            }).subscribe((val: any) => {
                console.log(val);
                if (val && val.data && val.data.setPassword) {
                    const send = val.data.setPassword;
                    if (send.code === 200 && send.code) {
                        this.back();
                        this.showToast(send.message);
                    } else {
                        this.showErrorToast(send.message);
                    }
                }
            });
        }
    }

    // 关闭登录页面
    back() {
        this.clear();
        this.route.navigate(['/']);
    }

    clear() {
        this.data = {
            ok: false,
            password1: '',
            password2: ''
        };
    }
}
