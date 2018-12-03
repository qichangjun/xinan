import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite-success',
  templateUrl: './invite-success.component.html',
  styleUrls: ['./invite-success.component.scss']
})
export class InviteSuccessComponent implements OnInit {
  lists = [
    { imgUrl: '../../../assets/imgs/tx.png', title: '小仙女', time: '注册日期：2019.03.10' },
    { imgUrl: '../../../assets/imgs/tx.png', title: '小仙女', time: '注册日期：2019.03.10' },
    { imgUrl: '../../../assets/imgs/tx.png', title: '小仙女', time: '注册日期：2019.03.10' },

  ];
  constructor() { }

  ngOnInit() {
  }

}
