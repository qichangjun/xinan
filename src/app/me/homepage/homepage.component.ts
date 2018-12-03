import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

    userInfo: any;

    constructor() {
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        this.userInfo.nickname = JSON.parse(this.userInfo.nickname);
        this.userInfo.avatar = JSON.parse(this.userInfo.avatar);
        this.userInfo.sex = JSON.parse(this.userInfo.sex);
        this.userInfo.profile = JSON.parse(this.userInfo.profile);
        console.log(this.userInfo);
    }

    ngOnInit() {
    }

}
