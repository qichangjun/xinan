import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TreatyPage } from './treaty.page';

const routes: Routes = [
    {
        path: '',
        component: TreatyPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        TreatyPage
    ]
})
export class TreatyPageModule { }
