import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Slides } from '@ionic/angular';

import { RescueData } from '../../../common/interface';
@Component({
    selector: 'all-rescue',
    templateUrl: './all-rescue.component.html',
    styleUrls: ['./all-rescue.component.scss']
})
export class AllRescueComponent implements OnInit {

    @ViewChild('slides') slides: Slides;

    items;
    type;
    title = '所有救助';
    label = '已救助';
    isShowLj = false;
    options: {
        autoplay: true
    };

    constructor(
        private rut: Router,
        private router: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.router.params.subscribe(
            (params) => {
                this.type = params.id;
                if (this.type === '1') { // 所有救助
                    this.title = '所有救助';
                    this.label = '已救助';
                    this.isShowLj = false;
                    this.items = Array.from({ length: 2 }, (_, k) => createNewRescue(k + 1));
                } else if (this.type === '2') { // 所有帮扶
                    this.title = '所有乐捐';
                    this.label = '已乐捐';
                    this.isShowLj = true;
                    this.items = Array.from({ length: 2 }, (_, k) => createNewGiving(k + 1));
                }
            }
        );
    }

    details() {
        let url = '';
        if (this.type === '1') { // 所有救助
            url = 'rescue';
        } else if (this.type === '2') { // 所有乐捐
            url = 'donation';
        }
        this.rut.navigate(['/details_xa'], { queryParams: { type: url } });
    }

    async stopSlideAutoplay() {
        await this.slides.stopAutoplay();
    }

    async startSlideAutoplay() {
        await this.slides.startAutoplay();
    }
}

function createNewRescue(id: number): RescueData {

    return {
        id: id.toString(),
        title: '疾病无情，人间有爱',
        image: '../../assets/imgs/shang_img2@2x.png',
        name: '林惠良',
        price: '100,000',
        rescueDate: '2018-10-21',
        introduce: '我叫林惠光今年28岁，我弟弟叫林惠良今年25岁，家住安徽省阜阳市太和县马集乡臧庄村委刘小庄54号，自2011年鼻子长期流血经检查血小班减少，皮肤黏膜出血6年，到现在已花光30万有余...'
    };
}

function createNewGiving(id: number): RescueData {

    return {
        id: id.toString(),
        title: '林慧光',
        image: '../../assets/imgs/shang_img2@2x.png',
        name: '林惠良',
        price: '100,000',
        rescueDate: '2018-10-21',
        introduce: '我叫林惠光今年28岁，我弟弟叫林惠良今年25岁，家住安徽省阜阳市太和县马集乡臧庄村委刘小庄54号，自2011年鼻子长期流血经检查血小班减少，皮肤黏膜出血6年，到现在已花光30万有余...'
    };
}
