import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportManagementPageComponent } from './report-management-page.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';
// import { DataFilterPipe } from './data-filter.pipe';
import { DataTableModule } from "angular2-datatable";
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    ModalModule.forRoot()
  ],
  providers: [AuthenService, NotificationService],
  declarations: [ReportManagementPageComponent]
})
export class ReportManagementPageModule { }
