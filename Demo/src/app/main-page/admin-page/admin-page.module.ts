import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageRouter } from './admin-page.router';
import { NotificationService } from '../../shared/service/notification.service';
import { UserManagementPageModule } from './user-management-page/user-management-page.module';
import { PostManagementPageModule } from './post-management-page/post-management-page.module';
import { DashboardPageModule } from './dashboard-page/dashboard-page.module';

@NgModule({
    imports: [
        AdminPageRouter,
        CommonModule,
        FormsModule,
        UserManagementPageModule,
        PostManagementPageModule,
        DashboardPageModule
    ],
    declarations: [
        AdminPageComponent
    ],
    providers : [ NotificationService ]
})

export class AdminPageModule {}