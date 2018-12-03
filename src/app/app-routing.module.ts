import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'treaty', loadChildren: './treaty/treaty.module#TreatyPageModule' },
    { path: 'bindPhone', loadChildren: './auth/bind-phone/bind-phone.module#BindPhonePageModule' },
    { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
