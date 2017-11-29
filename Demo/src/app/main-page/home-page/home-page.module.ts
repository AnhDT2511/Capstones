// import { SearchPageModule } from './search-page/search-page.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomePageRouter } from './home-page.router';
// import { TourPostPageComponent } from '../tour-post-page/tour-post-page.component';
// import { UtilityService } from '../shared/service/utility.service';
// import { AuthenService } from '../shared/service/authen.service';
// import { SignalrService } from '../shared/service/signalr.service';
import { NotificationService } from '../../shared/service/notification.service';

import {
       SectionAboutComponent,
//     SectionContactComponent,
//     SectionCoverComponent,
//     SectionPlaceComponent,
//     SectionProminentPlaceComponent,
//     SectionSearchComponent
} from './sub-home-page-component'
import { FormsModule } from '@angular/forms';
// import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
    imports: [
        HomePageRouter,
        CommonModule,
        FormsModule
    ],
    declarations: [
        // SectionCoverComponent,
        // SectionSearchComponent,
        SectionAboutComponent,
        // SectionProminentPlaceComponent,
        // SectionPlaceComponent,
        // SectionContactComponent,
        // SearchPageComponent,
        HomePageComponent
    ],
    providers : [ NotificationService ]
})

export class HomePageModule {}