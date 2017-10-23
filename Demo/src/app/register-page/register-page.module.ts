import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register-page.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../shared/service/notification.service';
import { AuthenService } from '../shared/service/authen.service';

export const routes: Routes = [
  //localhost:4200/login
  { path: '', component: RegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [NotificationService],
  declarations: [RegisterComponent]
})
export class RegisterPageModule { }