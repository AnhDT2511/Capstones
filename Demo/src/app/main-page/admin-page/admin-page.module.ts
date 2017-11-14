import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageRouter } from './admin-page.router';
import { NotificationService } from '../../shared/service/notification.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [
        AdminPageRouter,
        CommonModule,
        FormsModule,
        Ng2SmartTableModule
    ],
    declarations: [
        AdminPageComponent
    ],
    providers : [ NotificationService ]
})

export class AdminPageModule {}