import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserManagementPageComponent } from './user-management-page.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule
  ],
  providers: [AuthenService, NotificationService],
  declarations: [UserManagementPageComponent]
})
export class UserManagementPageModule { }
