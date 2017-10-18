import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuTopComponent} from './sub-component/menu-top.component';
import {HomePageComponent} from './home-page.component';
import {HomePageRouter}  from './home-page.router';
import {SectionCoverComponent}  from './sub-component/section-cover.component';
import {SectionSearchComponent}  from './sub-component/section-search.component';
import {SectionAboutComponent}  from './sub-component/section-about.component';
import {SectionProminentPlaceComponent}  from './sub-component/section-prominent-place.component';
import {SectionPlaceComponent}  from './sub-component/section-place.component';
import {SectionContactComponent}  from './sub-component/section-contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import  {LoginPageComponent} from '../login-page/login-page.component'
import { FormsModule } from '@angular/forms';
import {LoginService} from '../service/login.service'

@NgModule({
    imports: [
        HomePageRouter,
        CommonModule,
        NgbModule,
        FormsModule
    ],
    declarations: [
        MenuTopComponent,
        HomePageComponent,
        SectionCoverComponent,
        SectionSearchComponent,
        SectionAboutComponent,
        SectionProminentPlaceComponent,
        SectionPlaceComponent,
        SectionContactComponent,
        LoginPageComponent
        // NgbModule
    ],
    providers :[LoginService]
})

export class HomePageModule {}
