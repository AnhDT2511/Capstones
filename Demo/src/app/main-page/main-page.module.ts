import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { MainPageRouter }  from './main-page.router';
import { UtilityService } from '../shared/service/utility.service';
import { AuthenService } from '../shared/service/authen.service';
import { SignalrService } from '../shared/service/signalr.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module'
import { HomePageModule } from './home-page/home-page.module'
import {LayoutFooterComponent, LayoutHeaderComponent} from '../shared'

@NgModule({
    imports: [
        MainPageRouter,
        CommonModule,
        NgbModule,
        FormsModule,
        SharedModule,
        HomePageModule        
    ],
    declarations: [
        MainPageComponent
    ],
    providers :[UtilityService, AuthenService, SignalrService]
})

export class MainPageModule {}
