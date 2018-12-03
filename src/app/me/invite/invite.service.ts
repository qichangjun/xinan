import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
// import "rxjs/add/operator/map";
@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(
    public http: Http
  ) { }

  getRequestContact() {
    return this.http.get('assets/json/city.json');
  }
}
