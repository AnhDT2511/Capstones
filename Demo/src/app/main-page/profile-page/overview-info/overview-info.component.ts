import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SystemConstants } from '../../../shared/common';
import { DataService, UtilityService, NotificationService, CommonService, AuthenService } from '../../../shared/service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-overview-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './overview-info.component.html',
  styleUrls: ['../profile-page.component.css']
})
export class OverviewInfoComponent implements OnInit {
  user: any;
  listTourPost: any = [];
  listGroupPost: any = [];
  id: any = 0;
  viewPersionInfo: boolean = true;
  listSaveLink: any = [];
  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private authentication: AuthenService
  ) {
    this.user = this.authentication.getLoggedInUser();
  }

  ngOnInit() {
    if (localStorage.getItem('viewPersional') != "true") {
      this.viewPersionInfo = false;
    }
    this.id = localStorage.getItem('userID');
    this.dataService.get('/tours/post/get-all').subscribe((response: any) => {
      response.forEach(element => {
        //console.log(element);
        if (element.accountID === Number(this.id) && element.type == 0) {
          this.listTourPost.push({ 'tourPostID': element.id, 'title': element.tourArticleTitle, 'description': element.description, 'createdTime': element.createTime })
        } else if (element.accountID === Number(this.id) && element.type == 1) {
          this.listGroupPost.push({ 'tourPostID': element.id, 'title': element.tourArticleTitle, 'description': element.description, 'createdTime': element.createTime })
        }
      });
    }, error => {
    });
    //console.log(this.listTourPost);
   // console.log(this.listGroupPost);
    this.commonService.getListBookMarkByAccount(this.user.id, data => {
      data.forEach(element => {
        if (element.deleted == 0) {
          this.commonService.getTourPostByID(element.tourPostID, i => {
            this.listSaveLink.push(i);
          })
        }
        //console.log(this.listSaveLink);
      });
    });
  }

  updateTourPost(id) {
    this.utilityService.navigate('/main/profile/0/createPost/' + id);
  }

  updateGroupPost(id) {
    this.utilityService.navigate('/main/profile/0/createTour/' + id);
  }
  
}
