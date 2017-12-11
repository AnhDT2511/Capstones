import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { ProfilePageRouter } from './profile-page.router';
// import { UtilityService } from '../shared/service/utility.service';
// import { AuthenService } from '../shared/service/authen.service';
// import { SignalrService } from '../shared/service/signalr.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DialogChangePassComponent, TextChangePassComponent } from './dialog-change-pass/dialog-change-pass.component';
import { DialogChangeInfoComponent, TextChangeInfoComponent } from './dialog-change-info/dialog-change-info.component';
import { AvatarModule } from 'ngx-avatar';
import { CreateTourPageModule } from './create-tour/create-tour.module';
import { OverViewPageModule } from './overview-info/overview-info.module';
import { CreatePostPageModule } from './create-post/create-post.module';

@NgModule({
    imports: [
        ProfilePageRouter,
        CommonModule,
        FormsModule,
        SharedModule,
        OverViewPageModule,
        CreatePostPageModule,
        CreateTourPageModule,
        AvatarModule
    ],
    declarations: [
        ProfilePageComponent,
        TextChangePassComponent,
        TextChangeInfoComponent,
        DialogChangePassComponent,
        DialogChangeInfoComponent,
    ],
    entryComponents: [DialogChangePassComponent, DialogChangeInfoComponent ]
})

export class ProfilePageModule {}