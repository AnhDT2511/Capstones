import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { ProfilePageRouter }  from './profile-page.router';
// import { UtilityService } from '../shared/service/utility.service';
// import { AuthenService } from '../shared/service/authen.service';
// import { SignalrService } from '../shared/service/signalr.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ProfilePageRouter,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ProfilePageComponent
    ],
})

export class ProfilePageModule {}