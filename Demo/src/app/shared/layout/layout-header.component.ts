import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { SystemConstants } from '../common/system.constants';
import { UtilityService } from '../service/utility.service';
import { UrlConstants } from '../common/url.constants';

@Component({
    selector: 'app-layout-header',
    encapsulation: ViewEncapsulation.None,
    templateUrl:'./layout-header.component.html',
    // styleUrls : ['../../main-page/home-page/home-page.component.css'] 
})
export class LayoutHeaderComponent implements OnInit {

    userName : string = window.localStorage.getItem(SystemConstants.CURRENT_USER);
    constructor( private utilityService : UtilityService
    ) { 
    }

    ngOnInit() {
    }

    logout(){
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        this.utilityService.navigate(UrlConstants.LOGIN);
        console.log(window.localStorage);
    }
}
