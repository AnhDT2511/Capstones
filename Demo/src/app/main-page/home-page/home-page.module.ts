import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomePageRouter }  from './home-page.router';
// import { UtilityService } from '../shared/service/utility.service';
// import { AuthenService } from '../shared/service/authen.service';
// import { SignalrService } from '../shared/service/signalr.service';
import {
    SectionAboutComponent,
    SectionContactComponent,
    SectionCoverComponent,
    SectionPlaceComponent,
    SectionProminentPlaceComponent,
    SectionSearchComponent
} from './sub-home-page-component'
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        HomePageRouter,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        SectionCoverComponent,
        SectionSearchComponent,
        SectionAboutComponent,
        SectionProminentPlaceComponent,
        SectionPlaceComponent,
        SectionContactComponent,
        HomePageComponent
    ],
    // providers :[UtilityService, AuthenService, SignalrService]
})

export class HomePageModule {}