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
// import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
    imports: [
        ProfilePageRouter,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ProfilePageComponent,
        TextChangePassComponent,
        DialogChangePassComponent
    ],
    entryComponents: [DialogChangePassComponent]
})

export class ProfilePageModule {}