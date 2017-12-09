// import { SearchPageModule } from './search-page/search-page.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomePageRouter } from './home-page.router';
import { NotificationService } from '../../shared/service/notification.service';
import { AgmCoreModule } from '@agm/core';

import {
       SectionAboutComponent,
} from './sub-home-page-component'
import { FormsModule } from '@angular/forms';
// import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
    imports: [
        HomePageRouter,
        CommonModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB2LlIj3sk2akFpnpNcXzX9_NS08Xda1sE'
        })
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