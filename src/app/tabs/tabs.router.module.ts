import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { AboutPage } from '../about/about.page';
import { MePage } from '../me/me.page';
import { FondPage } from '../fond/fond.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                outlet: 'home',
                component: HomePage
            },
            {
                path: 'about',
                outlet: 'about',
                component: AboutPage
            },
            {
                path: 'fond',
                outlet: 'fond',
                component: FondPage
            },
            {
                path: 'me',
                outlet: 'me',
                component: MePage
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
