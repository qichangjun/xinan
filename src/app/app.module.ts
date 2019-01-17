// import { JoinSuccessComponent } from './join-success/join-success.component';
import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Alipay } from '@ionic-native/alipay/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { TreatyPageModule } from './treaty/treaty.module';
import { ComponentsModule } from './components1';
import { GraphQLModule } from './shared/graphql.module';
import { IonicGestureConfig } from './shared/ionic-gesture-config.service';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx';


// import { MultiPickerModule } from 'ion-multi-picker';
// import { Wechat } from '@ionic-native/wechat/ngx';
@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AuthModule,
        TreatyPageModule,
        ComponentsModule,
        GraphQLModule,
        HttpModule
        // MultiPickerModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ImagePicker,
        Camera,
        CallNumber,
        FileTransfer,
        Base64,        
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        // Wechat
        HTTP,
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: IonicGestureConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
