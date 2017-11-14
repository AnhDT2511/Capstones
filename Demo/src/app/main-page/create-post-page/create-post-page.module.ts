import { CreatePostPageRouter } from './create-post-page.router';
import { DataService } from '../../shared/service/data.service';
import { CreatePostService } from '../../shared/service/createpost.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post-page.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../shared/service/notification.service';
import { AuthenService } from '../../shared/service/authen.service';
import { LayoutFooterComponent } from '../../shared/layout/layout-footer.component';
import {ShareModule} from 'ng2share/share.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CreatePostPageRouter,
    ShareModule
  ],
  providers: [AuthenService, NotificationService, CreatePostService, DataService],
  declarations: [CreatePostComponent, LayoutFooterComponent]
})
export class CreatePostPageModule { }
