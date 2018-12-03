import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TabsService {

    private tabSubject: Subject<any>;

    constructor() {
        this.tabSubject = new Subject<any>();
    }

    getTabSubject(): Observable<any> {
        return this.tabSubject.asObservable();
    }

    setTabSubject(tabName: string) {
        this.tabSubject.next(tabName);
    }
}
