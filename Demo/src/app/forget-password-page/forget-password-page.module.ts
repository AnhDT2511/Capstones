import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password-page.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../shared/service/notification.service';
import { AuthenService } from '../shared/service/authen.service';

export const routes: Routes = [
  //localhost:4200/login
  { path: '', component: ForgetPasswordComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [NotificationService],
  declarations: [ForgetPasswordComponent]
})
export class ForgetPasswordPageModule { }