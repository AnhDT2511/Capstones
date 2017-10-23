import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageRouter }  from './admin-page.router';

import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        AdminPageRouter,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        AdminPageComponent
    ],
    // providers :[UtilityService, AuthenService, SignalrService]
})

export class AdminPageModule {}