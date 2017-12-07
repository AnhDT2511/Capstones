import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserManagementPageComponent } from './user-management-page.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [AuthenService, NotificationService],
  declarations: [UserManagementPageComponent]
})
export class UserManagementPageModule { }
