import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from './home-page.component';
import {HomePageRouter}  from './home-page.router';
import {SectionCoverComponent}  from './sub-component/section-cover.component';
import {SectionSearchComponent}  from './sub-component/section-search.component';
import {SectionAboutComponent}  from './sub-component/section-about.component';
import {SectionProminentPlaceComponent}  from './sub-component/section-prominent-place.component';
import {SectionPlaceComponent}  from './sub-component/section-place.component';
import {SectionContactComponent}  from './sub-component/section-contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        HomePageRouter,
        CommonModule,
        NgbModule,
        FormsModule
    ],
    declarations: [
        HomePageComponent,
        SectionCoverComponent,
        SectionSearchComponent,
        SectionAboutComponent,
        SectionProminentPlaceComponent,
        SectionPlaceComponent,
        SectionContactComponent,
        // NgbModule
    ],
    providers :[]
})

export class HomePageModule {}
