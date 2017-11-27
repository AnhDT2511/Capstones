import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EqualValidator } from './equal-validator.directive';
import { RegisterComponent } from './register-page.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../shared/service/notification.service';
import { AuthenService } from '../shared/service/authen.service';

export const routes: Routes = [
  { path: '', component: RegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [NotificationService],
  declarations: [RegisterComponent, EqualValidator]
})

export class RegisterPageModule {}