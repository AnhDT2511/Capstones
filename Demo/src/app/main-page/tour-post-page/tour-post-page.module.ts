import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourPostPageComponent } from './tour-post-page.component';
import { TourPostPageRouter } from './tour-post-page.router';
import { UtilityService } from '../../shared/service/utility.service';
import { AuthenService } from '../../shared/service/authen.service';
import { SignalrService } from '../../shared/service/signalr.service';
import { CommonService } from '../../shared/service/common.service'
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
// import { NgsRevealModule } from 'ng-scrollreveal';
import { ViewTextPageModule } from './viewtext-page/viewtext-page.module'
import { TimelinePageModule } from './timeline-page/timeline-page.module'

@NgModule({
    imports: [
        TourPostPageRouter,
        CommonModule,
        FormsModule,
        AvatarModule,
        ViewTextPageModule,
        TimelinePageModule
    ],
    declarations: [
        TourPostPageComponent
    ],
    providers: [ CommonService, SignalrService, AuthenService, UtilityService ],
})

export class TourPostPageModule {}