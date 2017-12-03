import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupPageComponent } from './group-page.component';
import { GroupPageRouter } from './group-page.router';
// import { UtilityService } from '../shared/service/utility.service';
// import { AuthenService } from '../shared/service/authen.service';
// import { SignalrService } from '../shared/service/signalr.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
    imports: [
        GroupPageRouter,
        CommonModule,
        FormsModule,
        SharedModule,
        AvatarModule
    ],
    declarations: [
        GroupPageComponent
    ]
})

export class GroupPageModule {}