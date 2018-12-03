import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    comment: String;
    lists = [
        {
            imgUrl: '../../../assets/imgs/tx.png',
            name: '小单',
            time: '刚刚',
            region: '广东 珠海',
            content: '谢谢大家对我的关心，已在积极恢复中'
        },
        {
            imgUrl: '../../../assets/imgs/tx.png',
            name: '林慧良',
            time: '刚刚',
            region: '广东 珠海',
            content: '他非常坚强，恢复很快',
            children: {
                name: '王晓光',
                time: '4小时前',
                region: '广东 珠海',
                content: '哥哥加油，早日康复，快回家想你了。我们都在',
            }
        },
        {
            imgUrl: '../../../assets/imgs/tx.png',
            name: '小单',
            time: '刚刚',
            region: '广东 珠海',
            content: '早日康复'
        },
    ];

    constructor() { }

    ngOnInit() {
    }

    butClick() {

    }

}
