import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourPostPageComponent } from './tour-post-page.component';
import { TourPostPageRouter }  from './tour-post-page.router';
// import { UtilityService } from '../shared/service/utility.service';
// import { AuthenService } from '../shared/service/authen.service';
// import { SignalrService } from '../shared/service/signalr.service';
import { CommonService } from '../../shared/service/common.service'
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        TourPostPageRouter,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TourPostPageComponent
    ],
    providers: [CommonService],
})

export class TourPostPageModule {}