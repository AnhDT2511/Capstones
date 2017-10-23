import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageRouter }  from './admin-page.router';
import { NotificationService } from '../../shared/service/notification.service';

@NgModule({
    imports: [
        AdminPageRouter,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        AdminPageComponent
    ],
    providers :[NotificationService]
})

export class AdminPageModule {}