import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../../shared/service/notification.service';
import { AuthenService } from '../../../shared/service/authen.service';
import { MessageContstants } from '../../../shared/common/message.constants';
import { UrlConstants } from '../../../shared/common/url.constants';
import { Router } from '@angular/router';
import { DataService } from './../../../shared/service/data.service';
import * as _ from "lodash";
import { CommonService } from '../../../shared/index';
import { InfoContstants } from '../../../shared/common/index';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Promise } from 'q';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management-page.component.html',
  styleUrls: ['./report-management-page.component.css']
})

export class ReportManagementPageComponent implements OnInit {

  @ViewChild('childModal') childModal: ModalDirective;
  public data = [];
  public dataDetail: any = [];
  public filterQuery = '';
  listReport: any = '';

  showChildModal(id) {
    this.getPostReport(id);
    this.childModal.show();

  }

  hideChildModal(): void {
    this.childModal.hide();
  }
  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router,
    private dataService: DataService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getAllReport();
  }

  getAllReport() {
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      this.data = response.filter(item => item.type == 0 );
      // console.log(this.data);
      for (let i in this.data) {
        this.data[i]['number'];
        this.data[i].deleted == 1 ? this.data[i]['checkBan'] = true : this.data[i]['checkBan'] = false;
        this.dataService.get('/tours/post/get-number-report-of-post/' + this.data[i].id).subscribe((res: any) => {
          let number = res;
          this.data[i]['number'] = typeof (number) != "number" ? 0 : number;
        });
      }
    }, error => {
    });
  }

  getPostReport(id) {
    // console.log(this.data);
    this.dataService.get('/tours/post/get-all-report-of-post/' + id).subscribe((response: any) => {
      // setTimeout(() => {
      this.dataDetail = response;
      // },300);
      // this.data[i]['details'] = this.dataDetail;
      // console.log(this.data);
      let listReport = '';
      response.forEach(function (element) {
        element.reasonReport.split(",").forEach(e => {
          listReport.indexOf(e) != -1 ? '' : listReport += e + ",";
        });
        //  listReport = listReport.substring(0,listReport.length-1);
      })
      //this.listReport = listReport;
    });
    //console.log(this.listReport);
    // console.log('ndsds');
    // let test = this.listReport.split(',').join('\n');
    // console.log(test);
  }


  acceptReport(tourpost) {
    if (tourpost.checkBan) {
      this.notificationService.printConfirmationDialog('Bạn có chắc chắn chấp nhận báo cáo của bài viết này!', () => {
        let banUser = tourpost;
        tourpost.deleted = 0;
        this.dataService.put('/tours/post/', banUser).subscribe((response: any) => {
          // console.log('ok');
          this.getAllReport();
        });
      });
    } else {
      this.notificationService.printConfirmationDialog('Bạn có chắc chắn hủy báo cáo bài viết này!', () => {
        let banUser = tourpost;
        tourpost.deleted = 1;
        this.dataService.put('/tours/post/', banUser).subscribe((response: any) => {
          // console.log('ok');
          this.getAllReport();
        });
      });
    }
  }

}
