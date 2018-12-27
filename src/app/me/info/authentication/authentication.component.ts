import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  certifying : any = ''
  constructor() { }

  ngOnInit() {
    this.certifying = JSON.parse(window.localStorage.getItem('userInfo')).certifying

    // JSON.parse(window.localStorage.getItem('userInfo')).certifying
  }

}
