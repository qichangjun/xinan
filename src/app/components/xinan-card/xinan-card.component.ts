import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'xinan-card',
    templateUrl: './xinan-card.component.html',
    styleUrls: ['./xinan-card.component.scss']
})
export class XinanCardComponent implements OnInit {

    @Input() data: Array<object> = [];

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    view(type, id) {
        if (id) {
            this.router.navigate(['/details_xa'], { queryParams: { type, id } });
        } else {
            this.router.navigate(['/details_xa'], { queryParams: { type } });
        }
    }

}
