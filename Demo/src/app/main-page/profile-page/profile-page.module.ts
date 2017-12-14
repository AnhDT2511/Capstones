import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { ProfilePageRouter } from './profile-page.router';
import { DataService } from '../../shared/service/data.service';
import { FormsModule } from '@angular/forms';
import { DialogChangePassComponent, TextChangePassComponent } from './dialog-change-pass/dialog-change-pass.component';
import { DialogChangeInfoComponent, TextChangeInfoComponent } from './dialog-change-info/dialog-change-info.component';
import { AvatarModule } from 'ngx-avatar';
import { CreateTourPageModule } from './create-tour/create-tour.module';
import { OverViewPageModule } from './overview-info/overview-info.module';
import { CreatePostPageModule } from './create-post/create-post.module';
import { SharedModule } from '../../shared/shared.module';
import { UploadFileService } from '../../shared/service/upload.service';

@NgModule({
    imports: [
        ProfilePageRouter,
        CommonModule,
        FormsModule,
        OverViewPageModule,
        CreatePostPageModule,
        CreateTourPageModule,
        AvatarModule,
        SharedModule
    ],
    declarations: [
        ProfilePageComponent,
        TextChangePassComponent,
        TextChangeInfoComponent,
        DialogChangePassComponent,
        DialogChangeInfoComponent,
    ],
    providers : [DataService , UploadFileService],
    entryComponents: [DialogChangePassComponent, DialogChangeInfoComponent ]
})

export class ProfilePageModule {}